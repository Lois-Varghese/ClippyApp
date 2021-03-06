import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const NoData = ({textValue, showBottomSheet, openModal}) => {
  const bgColor = showBottomSheet || openModal ? colors.grey : colors.white;

  return (
    <>
      <View style={[styles.container, {backgroundColor: bgColor}]}>
        <Text>{textValue}</Text>
      </View>
    </>
  );
};
