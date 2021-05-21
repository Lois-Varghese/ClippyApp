import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import colors from '../config/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const NoData = ({textValue}) => {
  return (
    <>
      <View style={styles.container}>
        <Text>{textValue}</Text>
      </View>
    </>
  );
};
