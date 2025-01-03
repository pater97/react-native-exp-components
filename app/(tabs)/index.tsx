import { useState } from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
// -- COMPONENT BY EXPO
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// -- BASE COMPONENT
import { Button } from "@/components/base/button";
import { CustomModal } from "@/components/base/modal";
import { LiveTimer } from "@/components/base/timer";
import { Input } from "@/components/base/input";
import PressableSwitch
// -- NAVIGATION COMPONENT
import WheelMenu from "@/components/navigation/WheelMenu1";
import WheelMenu2 from "@/components/navigation/WheelMenu2";
import WheelMenu3 from "@/components/navigation/WheelMenu3";

export default function HomeScreen() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <ScrollView>
      {/* base components */}
      <ThemedView style={{ marginVertical: 60, padding: 30 }}>
        <ThemedText
          type="title"
          style={{ textAlign: "center", paddingBottom: 30 }}
        >
          base components
        </ThemedText>
        <Button onPress={() => setOpenModal(true)} text="apri modal" />
        <CustomModal
          modalVisible={openModal}
          title="ciao"
          confirmText="yes"
          declineText="no"
          subtitle="sottotitolo"
          closeDialog={() => setOpenModal(false)}
          confirm={() => setOpenModal(false)}
        />
        <ThemedView
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <LiveTimer controls />
        </ThemedView>
        <Input onChangeText={(e) => console.log(e)} placeholder="scrivi" selectionColor={'red'} />
      </ThemedView>
      {/* navigation components */}
      <ThemedView style={{ marginTop: 60 }}>
        <ThemedText type="title" style={{ textAlign: "center" }} >
          navigation components
        </ThemedText>
        <WheelMenu />
        <WheelMenu2 />
        <WheelMenu3 />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
