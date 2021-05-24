import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textGrey,
    width: '100%',
    height: 0.4,
    marginTop: 16,
  },
});

export default function Separator() {
  return <View style={styles.container} />;
}
