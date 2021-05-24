import {Linking, Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import colors from '../config/colors';

export const openLink = url => {
  Linking.openURL(url).catch(() =>
    Alert.alert('Sorry, something went wrong.', 'Please try again later.'),
  );
};

export const displayToast = toastText => {
  return Toast.show(toastText, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: false,
    animation: true,
    hideOnPress: true,
    backgroundColor: colors.green,
    delay: 0,
  });
};
