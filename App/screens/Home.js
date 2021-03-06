import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet, StatusBar, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainContext} from '../util/MainContext';
import Header from '../components/Header';
import colors from '../config/colors';
import {CollectionList} from './CollectionList';
import {ArticleList} from './ArticleList';
import AddIcon from '../components/AddIcon';
import {NoData} from './NoData';
import AppModal from '../common/Modal';
import BottomSheet from '../common/BottomSheet';

const Stack = createStackNavigator();

const screenNames = {
  collectionList: 'CollectionList',
  articleList: 'ArticleList',
  addIcon: 'AddIcon',
  noData: 'NoData',
  appModal: 'AppModal',
  bottomSheet: 'BottomSheet',
};

export const Home = () => {
  const {
    openModal,
    collectionList,
    showHeaderButtons,
    setCollectionList,
    setArticleList,
    showBottomSheet,
  } = useContext(MainContext);

  const bgColor =
    collectionList.length && showHeaderButtons && openModal
      ? colors.lightGrey
      : openModal || showBottomSheet
      ? colors.footerBlack
      : colors.white;

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const clippyData = await AsyncStorage.getItem('clippyData');
        const articleData = await AsyncStorage.getItem('articleData');
        if (clippyData !== null) {
          const clippyDataParsed = JSON.parse(clippyData);
          setCollectionList(clippyDataParsed);
        } else {
          await AsyncStorage.setItem('clippyData', JSON.stringify([]));
          setCollectionList([]);
        }
        if (articleData !== null) {
          const articleDataParsed = JSON.parse(articleData);
          setArticleList(articleDataParsed);
        } else {
          await AsyncStorage.setItem('articleData', JSON.stringify([]));
          setArticleList([]);
        }
      } catch (e) {
        Alert.alert('Something went wrong.', 'Please try again later.');
      }
    };
    fetchAppData();
  }, [setArticleList, setCollectionList]);

  return (
    <>
      <SafeAreaView style={styles.headerContainer} />
      <SafeAreaView
        style={[styles.footerContainer, {backgroundColor: bgColor}]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.red} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={screenNames.collectionList}
            screenOptions={{
              header: props => <Header {...props} />,
            }}>
            <Stack.Screen
              name={screenNames.collectionList}
              component={CollectionList}
            />
            <Stack.Screen name={screenNames.noData} component={NoData} />
            <Stack.Screen
              name={screenNames.articleList}
              component={ArticleList}
            />
            <Stack.Screen name={screenNames.appModal} component={AppModal} />
            <Stack.Screen
              name={screenNames.bottomSheet}
              component={BottomSheet}
            />
            <Stack.Screen name={screenNames.addIcon} component={AddIcon} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <View style={styles.footerWrapper}>
        <AddIcon />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    backgroundColor: colors.red,
  },
  footerContainer: {
    flex: 1,
  },
  footerWrapper: {
    position: 'absolute',
    right: 27,
    bottom: 26,
  },
});
