// -- RN
import { StyleSheet } from 'react-native';

export const liveTimerStyle = StyleSheet.create({
  timerContainer: {
    width: 90,
    backgroundColor: '#FFFFFF90',
    borderRadius: 10,
    flexDirection:'column',
    gap:5
  },
  centerItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    fontSize: 18
  },
  timericon: {
    height: 12,
    width: 12
  },
  buttonContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    marginVertical:10
  }
});
