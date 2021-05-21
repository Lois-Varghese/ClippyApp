import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import Input from '../common/Input';
import Dropdown from '../common/Dropdown';

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

export default function CreateClip() {
  const {
    collectionFormData,
    setCollectionFormData,
    articlesFormData,
    setArticlesFormData,
    dropdownOpen,
    setOpenModal,
  } = useContext(MainContext);

  const validateText = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      alert('Invalid email entered');
      return false;
    }
  };

  const onTextChange = text => {
    // validateText(text);
    setArticlesFormData({...articlesFormData, url: text});
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Collection</Text>
        <Dropdown />
        <Text style={[styles.textStyle, styles.urlText]}>URL</Text>
        <Input
          value={articlesFormData.url}
          styleAdd={styles.input}
          onChange={value => onTextChange(value)}
        />
      </View>
      {dropdownOpen === false && (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={() => {
              setOpenModal(false);
            }}>
            <Text style={styles.buttonCancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCreate} onPress={() => {}}>
            <Text style={styles.buttonCreateText}>Create</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
