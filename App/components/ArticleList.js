import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  Image,
} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Separator from '../common/Separator';
import {NoData} from '../common/NoData';
import {openLink} from '../config/functions';

export const ArticleList = () => {
  const {
    showBottomSheet,
    openModal,
    articlesList,
    convertToSectionDataFormat,
    setArticleId,
    setItemUrl,
    setShowBottomSheet,
    setBottomSheetType,
    collectionId,
  } = useContext(MainContext);

  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    setParsedData(convertToSectionDataFormat());
  }, [articlesList, convertToSectionDataFormat]);

  const bgColors =
    showBottomSheet === true || openModal === true
      ? colors.lightBlack
      : colors.white;

  const articleList = articlesList.filter(
    article => article.collectionListId === collectionId,
  );

  const readItems = articleList.filter(item => item.isRead === true);

  const showReadText = title =>
    title !== 'Read' ? 'none' : readItems.length > 0 ? 'flex' : 'none';

  const paddingShowText = title => (title === 'Read' ? 28 : 0);

  const dataText = 'No clips! Add clips using the + button';

  const renderEmptyContainer = () => {
    return (
      <NoData
        textValue={dataText}
        showBottomSheet={showBottomSheet}
        openModal={openModal}
      />
    );
  };

  const handleOpenArticle = (url, id) => {
    setArticleId(id);
    openLink(url);
  };

  const handleOpenBottomSheet = (url, id) => {
    setArticleId(id);
    setItemUrl(url);
    setShowBottomSheet(true);
    setBottomSheetType('article');
  };

  return (
    <View style={[styles.container, {backgroundColor: bgColors}]}>
      <SectionList
        sections={parsedData}
        keyExtractor={(_item, index) => index}
        renderSectionHeader={({section: {title}}) => (
          <Text
            style={[
              styles.readText,
              {
                display: showReadText(title),
                marginTop: paddingShowText(title),
              },
            ]}>
            {title}
          </Text>
        )}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              style={styles.listWrapper}
              onLongPress={() => handleOpenBottomSheet(item.url, item.id)}
              onPress={() => handleOpenArticle(item.url, item.id)}>
              <Image source={{uri: item.imageUrl}} style={styles.image} />
              <Text style={styles.articleTitle}>{item.title}</Text>
            </TouchableOpacity>
            <Separator />
          </>
        )}
        ListEmptyComponent={renderEmptyContainer}
      />
    </View>
  );
};

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
    paddingLeft: 22,
  },
  readText: {
    color: colors.textGrey,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 14,
    fontSize: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
});
