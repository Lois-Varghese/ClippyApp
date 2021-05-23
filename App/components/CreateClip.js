import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import Input from '../common/Input';
import Dropdown from '../common/Dropdown';

export default function CreateClip() {
  const {
    articlesFormData,
    setArticlesFormData,
    dropdownOpen,
    setOpenModal,
    isEditArticle,
    addArticles,
    editArticle,
    setEditArticle,
  } = useContext(MainContext);

  const onTextChange = text => {
    setArticlesFormData({...articlesFormData, url: text});
  };

  const handleCreate = () => {
    if (articlesFormData.collectionListId === null) {
      alert('Please select a collection type');
      return false;
    }
    let validatedRegEx =
      /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
        articlesFormData.url,
      );

    if (articlesFormData.url === '' || validatedRegEx === false) {
      alert('Invalid URL entered');
      return false;
    }

    if (isEditArticle === true) {
      editArticle();
    } else {
      addArticles();
    }
  };

  const clearForm = () => {
    setArticlesFormData({
      collectionListId: null,
      label: '',
      url: '',
      isRead: false,
    });
  };

  const buttonText = isEditArticle === true ? 'Save' : 'Create';

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Collection</Text>
        <Dropdown />

        <Text style={[styles.textStyle, styles.urlText]}>URL</Text>
        {dropdownOpen === false && (
          <Input
            value={articlesFormData.url}
            autoCapitalize={'none'}
            styleAdd={styles.input}
            onChange={value => onTextChange(value)}
          />
        )}
      </View>
      {dropdownOpen === false && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              setEditArticle(false);
              clearForm();
              setOpenModal(false);
            }}>
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCreate}
            onPress={() => handleCreate()}>
            <Text style={styles.buttonCreateText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    marginLeft: 11,
  },
  textStyle: {
    fontSize: 14,
  },
  input: {
    backgroundColor: colors.greyColor,
    marginTop: 6,
    height: 44,
  },
  urlText: {
    marginTop: 22,
  },
  buttonWrapper: {
    height: 55,
    marginTop: 7,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCancel: {
    width: 156,
    height: 32,
    borderWidth: 1,
    borderColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderRadius: 2,
  },
  buttonCancelText: {
    color: colors.yellow,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  buttonCreate: {
    width: 156,
    height: 32,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonCreateText: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
});
