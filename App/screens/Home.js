import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainContext} from '../util/MainContext';
import {InnerHome} from './InnerHome';
import Header from '../components/Header';
import colors from '../config/colors';
import {CollectionList} from '../components/CollectionList';
import {ArticleList} from '../components/ArticleList';
import AddIcon from '../components/AddIcon';
import {NoData} from '../common/NoData';
import AppModal from '../common/Modal';
import BottomSheet from '../common/BottomSheet';

const Stack = createStackNavigator();

const screenNames = {
  home: 'Home',
  collectionList: 'CollectionList',
  articleList: 'ArticleList',
  addIcon: 'AddIcon',
  noData: 'NoData',
  appModal: 'AppModal',
  bottomSheet: 'BottomSheet',
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

export const Home = () => {
  const {openModal, collectionList, showHeaderButtons, setCollectionList} =
    useContext(MainContext);
  const bgColor =
    openModal === true
      ? collectionList.length > 0
        ? showHeaderButtons === true
          ? colors.lightGrey
          : colors.footerBlack
        : colors.lightGrey
      : colors.white;

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const clippyData = await AsyncStorage.getItem('clippyData');
        if (clippyData !== null) {
          const clippyDataParsed = JSON.parse(clippyData);
          setCollectionList(clippyDataParsed);
        } else {
          await AsyncStorage.setItem('clippyData', JSON.stringify([]));
          setCollectionList([]);
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Something went wrong. Please try again.');
      }
    };
    fetchAppData();
  }, []);
  return (
    <>
      <SafeAreaView style={styles.headerContainer} />
      <SafeAreaView
        style={[styles.footerContainer, {backgroundColor: bgColor}]}>
        <StatusBar barStyle="light-content" backgroundColor={colors.red} />
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={screenNames.home}
            screenOptions={{
              header: props => <Header {...props} />,
            }}>
            <Stack.Screen name={screenNames.home} component={InnerHome} />
            <Stack.Screen name={screenNames.noData} component={NoData} />
            <Stack.Screen
              name={screenNames.collectionList}
              component={CollectionList}
            />
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
    </>
  );
};
