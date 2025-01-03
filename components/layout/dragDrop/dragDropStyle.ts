// -- RN
import { StyleSheet,Dimensions } from 'react-native';
// -- PROPRIETIES
export const fullHeight = Dimensions.get('window').height;
export const fullWidth = Dimensions.get('window').width;
export const secondaryViewDimensions: { heigth: number; width: number } = { heigth: 150, width: 100 }; 
// -- HEADER STYLE
export const dragAndDropStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    height: secondaryViewDimensions.heigth,
    width: secondaryViewDimensions.width
  },
  fullScreen: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000,
    height: fullHeight,
    width: fullWidth
  }
});
