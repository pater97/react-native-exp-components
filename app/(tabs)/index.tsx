import { Image, StyleSheet, Platform, ScrollView } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import WheelMenu from '@/components/navigation/WheelMenu1';
import WheelMenu2 from '@/components/navigation/WheelMenu2';
import WheelMenu3 from '@/components/navigation/WheelMenu3';

export default function HomeScreen() {
  return (
    <ScrollView
     >

        <WheelMenu/>
        <WheelMenu2/>
        <WheelMenu3/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    position: 'absolute',
  },
});
