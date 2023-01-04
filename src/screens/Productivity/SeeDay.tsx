import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, SectionListData } from "react-native";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import { getRatingDict, getReviewDict } from "../RateDay";


export default function SeeDay(){
    const theme = useAppSelector(getTheme);
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          marginHorizontal: 0
        },
        item: {
          //backgroundColor: theme.primary,
          padding: 2,
          marginVertical: 2
        },
        header: {
          fontSize: 24,
          backgroundColor: theme.primary
        },
        title: {
          fontSize: 20
        }
      });
      var reviewDict = getReviewDict();
      var ratingDict = getRatingDict();
    var DATA = Object.keys(getReviewDict()).map((item) => ({title: item, data: [reviewDict[item], ratingDict[item]]}));
      
      const Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );   
        return(
            <SafeAreaView style={styles.container}>
    <SectionList
      sections= {DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
);
 } 