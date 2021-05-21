import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Separator from '../common/Separator';
import Icon from 'react-native-remix-icon';
import AddIcon from './AddIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    paddingTop: 16,
    paddingLeft: 21,
    paddingRight: 20,
    flexDirection: 'row',
  },
  articleTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
    paddingLeft: 12,
  },
  readText: {
    color: colors.textGrey,
    textAlign: 'center',
    marginTop: 31,
    fontWeight: '400',
    marginBottom: 14,
    fontSize: 16,
  },
  footerWrapper: {
    position: 'absolute',
    right: 27,
    bottom: 0,
  },
});

export const ArticleList = ({navigation}) => {
  const {showBottomSheet, openModal} = useContext(MainContext);
  const bgColors =
    showBottomSheet === true || openModal === true
      ? colors.lightBlack
      : colors.white;
  return (
    <>
      <ScrollView style={[styles.container, {backgroundColor: bgColors}]}>
        {/* to add in loop for each item */}
        <TouchableOpacity style={styles.listWrapper}>
          <Icon name="ri-links-line" size="24" color={colors.black} />
          <Text style={styles.articleTitle}>JavaScript Articles</Text>
        </TouchableOpacity>
        <Separator />
        <TouchableOpacity style={styles.listWrapper}>
          <Icon name="ri-links-line" size="24" color={colors.black} />
          <Text style={styles.articleTitle}>JavaScript Articles</Text>
        </TouchableOpacity>
        <Separator />

        <Text style={styles.readText}>Read</Text>
        <TouchableOpacity style={styles.listWrapper}>
          <Icon name="ri-links-line" size="24" color={colors.black} />
          <Text style={styles.articleTitle}>JavaScript Articles</Text>
        </TouchableOpacity>
        <Separator />
      </ScrollView>
      <View style={styles.footerWrapper}>
        <AddIcon />
      </View>
    </>
  );
};
