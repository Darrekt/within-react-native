import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../styles";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { Icon } from "react-native-elements";

export type Props = {
  question: string;
  rating: number;
  setRating: (val: string | React.ChangeEvent) => void;
};

export default function QuestionWithSlider({
  question,
  rating,
  setRating,
}: Props) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <Text style={textStyles.surveyQuestion}>{question}</Text>
      <Slider
        value={rating}
        onValueChange={(val) => setRating(val.toString())}
        minimumValue={1}
        maximumValue={5}
        step={1}
        trackStyle={{
          height: 10,
          backgroundColor: "transparent",
        }}
        thumbStyle={{
          height: 20,
          width: 20,
          backgroundColor: "transparent",
        }}
        thumbProps={{
          children: (
            <Icon
              name="heartbeat"
              type="font-awesome"
              size={15}
              reverse
              containerStyle={{ bottom: 15, right: 15 }}
              color="#01D1EE"
            />
          ),
        }}
      />
    </View>
  );
}