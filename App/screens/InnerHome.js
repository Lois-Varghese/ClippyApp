import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import {CollectionList} from '../components/CollectionList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export const InnerHome = ({navigation}) => {
  const {openModal} = useContext(MainContext);
  const bgColor = openModal === true ? colors.lightBlack : colors.white;

  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <CollectionList navigation={navigation} />
    </View>
  );
};
