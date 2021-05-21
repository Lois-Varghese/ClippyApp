import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Separator from '../common/Separator';
import AddIcon from './AddIcon';
import {NoData} from '../common/NoData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  collectionTitle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
  articleTitle: {
    color: colors.textGrey,
    fontSize: 12,
    marginTop: 10,
    fontWeight: '400',
  },
  listWrapper: {
    paddingTop: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  footerWrapper: {
    position: 'absolute',
    right: 27,
    bottom: 0,
  },
});

export const CollectionList = ({navigation}) => {
  const {
    showBottomSheet,
    openModal,
    setShowHeaderButtons,
    collectionList,
    setCollectionId,
  } = useContext(MainContext);

  const bgColors =
    showBottomSheet === true || openModal === true
      ? colors.lightBlack
      : colors.white;

  const dataText =
    'No clips! Start by creating a collection using the + button';

  const renderEmptyContainer = () => {
    return (
      openModal === false && (
        <NoData textValue={dataText} navigation={navigation} />
      )
    );
  };

  const renderItem = ({item}) => (
    <>
      <TouchableOpacity
        style={styles.listWrapper}
        onPress={() => {
          setCollectionId(item.id);
          setShowHeaderButtons(true);
          navigation.navigate('ArticleList');
        }}>
        <Text style={styles.collectionTitle}>{item.label}</Text>
        <Text style={styles.articleTitle}>No clips!</Text>
      </TouchableOpacity>
      <Separator />
    </>
  );

  return (
    <>
      <View style={[styles.container, {backgroundColor: bgColors}]}>
        <FlatList
          data={collectionList}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index}
          ListEmptyComponent={renderEmptyContainer()}
        />
      </View>
      <View style={styles.footerWrapper}>
        <AddIcon />
      </View>
    </>
  );
};
