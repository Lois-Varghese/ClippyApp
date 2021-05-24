import React, {useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import Input from '../common/Input';

export default function CreateCollection() {
  const {
    collectionFormData,
    setCollectionFormData,
    setOpenModal,
    addCollection,
    isEditCollection,
    editCollection,
    setEditCollection,
  } = useContext(MainContext);

  const handleCreate = () => {
    if (isEditCollection === true) {
      editCollection();
    } else {
      addCollection();
    }
    setEditCollection(false);
    clearForm();
    setOpenModal(false);
  };

  const clearForm = () => {
    setCollectionFormData({label: ''});
  };

  const buttonText = isEditCollection === true ? 'Save' : 'Create';

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Collection name</Text>
        <Input
          value={collectionFormData.label}
          styleAdd={styles.input}
          onChange={value =>
            setCollectionFormData({...collectionFormData, label: value})
          }
        />
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => {
            setEditCollection(false);
            setOpenModal(false);
            clearForm();
          }}>
          <Text style={styles.buttonCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCreate}
          onPress={() => handleCreate()}>
          <Text style={styles.buttonCreateText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
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
  buttonWrapper: {
    height: 55,
    marginTop: 2,
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
