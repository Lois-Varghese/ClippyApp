import React from 'react';
import {Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    fontFamily: 'IBMPlexSerif-LightItalic',
  },
});

const AppText = props => {
  return (
    <Text {...props} style={[styles.container, props.style]}>
      {props.children}
    </Text>
  );
};

export default AppText;
