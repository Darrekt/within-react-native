import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { globalStyles, textStyles } from "../../styles";
import OneButtonForm from "../components/layout/OneButtonForm";
import QuestionWithSlider from "../components/QuestionWithSlider";
import SubmitButton from "../components/util/SubmitButton";
import { useAppSelector } from "../redux/hooks";
import { getSettings, getTheme } from "../redux/selectors";
import { TodoEntity } from "../models/Todo";
import { getCompletedProjects, getCompletedTodos } from "../redux/selectors";
import { Collection, List } from "immutable";
import { compareCompleted } from "../util/compareDates";


var reviewDict = {};
var ratingDict = {};
export function getReviewDict(): {[key: string]: string}{
  return reviewDict;
}
export function getRatingDict(): {[key: string]: string}{
  return ratingDict;
}

export default function RateDay() {  
  var now = new Date();
    const [endDay, setendDay] = useState(now.getTime());
    const settings = useAppSelector(getSettings);
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();

  const iitems: TodoEntity[] = useAppSelector(getCompletedTodos);
  const groupItems = List(iitems as TodoEntity[])
    .sort(compareCompleted)
    .groupBy((iitem) =>
      iitem.completed ? new Date(iitem.completed).toDateString() : null
    )
    .toArray();

   const Moment = require('moment');
   const MomentRange = require('moment-range');
   const moment = MomentRange.extendMoment(Moment);
   var days = 50;
   let start = (endDay - days*24*60*60*1000), end = endDay;
   let date: number[] = []
   date.push(moment(start).toDate().toDateString());
while(moment(start) <= moment(end).subtract(1, 'days')){
  start = moment(start).add(1, 'days').toDate().toDateString();
  date.push(start);
  
}
var tododay ={};
date.forEach((item) => {if(item){(tododay as any)[item] = 0}})
groupItems.forEach((item) =>{ if(item[0] != null){if(item[0] in tododay){(tododay as any)[item[0]] = item[1].count()}}})
 var todotoday = tododay[moment(endDay).toDate().toDateString() as keyof typeof tododay];
 //date.forEach((item) => {if(item){(ratingArray as any)[item] = 0}})
 //date.forEach((item) => {if(item){(reviewArray as any)[item] = ""}})

  return (
    <Formik
      initialValues={{
        dayRate: 3,
        dayReview: "",
      }}
      validate={(values) => ({})}
      onSubmit={(values) => {
        date.forEach((item) => {if(item == moment(endDay).toDate().toDateString()){(ratingDict as any)[item] = values.dayRate}})
        date.forEach((item) => {if(item == moment(endDay).toDate().toDateString()){(reviewDict as any)[item] = values.dayReview}})
        navigation.goBack();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "You have successfully rated your day",
          text2: "Thanks for rating your productive day",
        });
      }}
    >
      {(formik) => (
        <OneButtonForm
          behaviour="padding"
          centerFields={false}
          button={
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Submit review"
            />
          }
        >
          <QuestionWithSlider
            question={"How would you rate your day?"}
            rating={formik.values.dayRate}
            setRating={(val) => formik.setFieldValue("dayRate", val)}
          />
          <Text style={textStyles.questionText}>
            What is your review about today?:
          </Text>
          <TextInput
            style={{
              ...globalStyles.largeInputBox,
              borderColor: theme.dark,
            }}
            multiline
            autoCapitalize="sentences"
            onChangeText={formik.handleChange("dayReview")}
            shouldCancelWhenOutside
            value={formik.values.dayReview}
          />
          <Text style={textStyles.header}>
            Number of todos finished today:
          </Text>
          <Text style={{fontSize:100}}>
            {todotoday}
          </Text>
        </OneButtonForm>
      )}
    </Formik>
  );
}
