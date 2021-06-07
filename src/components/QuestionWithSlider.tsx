import React from "react";
import { View, Text } from "react-native";
import { textStyles } from "../../styles";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { Icon } from "react-native-elements";
import { useAppSelector } from "../redux/hooks";
import { getTheme } from "../redux/selectors";

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
  const theme = useAppSelector(getTheme);
  return (
    <View
      style={{
        alignSelf: "stretch",
        justifyContent: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={textStyles.questionText}>{question}</Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
        }}
      >
        <Slider
          value={rating}
          onValueChange={(val) => setRating(val.toString())}
          minimumValue={1}
          maximumValue={5}
          step={1}
          style={{ width: "100%" }}
          minimumTrackTintColor={theme.primary}
          maximumTrackTintColor={theme.light}
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
                name="heart"
                type="font-awesome"
                size={15}
                reverse
                containerStyle={{ bottom: 15, right: 15 }}
                color={theme.dark}
              />
            ),
          }}
        />
      </View>
    </View>
  );
}
