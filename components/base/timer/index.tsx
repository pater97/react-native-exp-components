// -- REACT
import { FC, useEffect } from "react";
// -- COMPONENTS
import { View, Text } from "react-native";
import { Button } from "../button";
// -- STYLE
import { liveTimerStyle } from "./live-timer-style";
// -- TYPE
import { timerProps } from "./timer";
// -- HOOK TIMER
import { useTimer } from "@/hooks/useTimer";

export const LiveTimer: FC<timerProps> = ({ controls = false }) => {
  // # TIMER FUNCTIONALITIES
  const { time, start, stop, reset } = useTimer(0, 0, 0);
  // # START TIMER WHEN RENDER IT
  useEffect(() => {
    start();
    return () => {
      stop();
      reset(0, 0, 0); // Reset ai valori iniziali per esempio
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // #  FROMAT TIME IN 00:00:00
  const formatTime = (
    hours: number,
    minutes: number,
    seconds: number
  ): string => {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return (
    <View style={[liveTimerStyle.timerContainer, liveTimerStyle.centerItem]}>
      <Text style={liveTimerStyle.timer}>
        {formatTime(time.hours, time.minutes, time.seconds)}
      </Text>
      {controls && (
        <View style={liveTimerStyle.buttonContainer}>
          <Button
            onPress={() => stop()}
            text="stop"
            backgroundColor="red"
            borderColor="black"
            textColor="black"
          />
          <Button
            onPress={() => start()}
            text="start"
            backgroundColor="black"
            borderColor="red"
            textColor="white"
          />
          <Button
            onPress={() => reset(0, 0, 0)}
            text="reset"
            backgroundColor="white"
            borderColor="red"
            textColor="red"
          />
        </View>
      )}
    </View>
  );
};
