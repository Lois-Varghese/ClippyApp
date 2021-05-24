import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Separator from '../common/Separator';
import {NoData} from '../common/NoData';

export const CollectionList = ({navigation}) => {
  const {
    showBottomSheet,
    openModal,
    setShowHeaderButtons,
    collectionList,
    setCollectionId,
    articlesList,
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
        <NoData
          textValue={dataText}
          showBottomSheet={showBottomSheet}
          openModal={openModal}
        />
      )
    );
  };

  const renderItem = ({item}) => {
    const articles = articlesList.filter(
      article => article.collectionListId === item.id,
    );
    const titles = articles.length > 3 ? articles.slice(0, 3) : articles;
    const noArticles = articles.length === 0 ? true : false;

    return (
      <>
        <TouchableOpacity
          style={styles.listWrapper}
          key={item.id}
          onPress={() => {
            setCollectionId(item.id);
            setShowHeaderButtons(true);
            navigation.navigate('ArticleList');
          }}>
          <Text style={styles.collectionTitle}>{item.label}</Text>
          {titles.map(article => (
            <Text style={styles.articleTitle} key={article.id}>
              {article.title}
            </Text>
          ))}
          {noArticles && <Text style={styles.articleTitle}>No clips!</Text>}
        </TouchableOpacity>
        <Separator />
      </>
    );
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColors}]}>
      <FlatList
        data={collectionList}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index}
        ListEmptyComponent={renderEmptyContainer()}
      />
    </View>
  );
};

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
});
