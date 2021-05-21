import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 326,
    borderRadius: 2,
    padding: 12,
    fontSize: 18,
    fontFamily: 'IBMPlexSerif-MediumItalic',
  },
});

export default function Input({styleAdd, value, onChange}) {
  return (
    <TextInput
      style={[styles.input, styleAdd]}
      value={value}
      onChangeText={onChange}
    />
  );
}
