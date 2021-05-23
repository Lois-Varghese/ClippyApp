import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';

const styles = StyleSheet.create({
  dropdown: {
    height: 42,
    width: 326,
    fontSize: 18,
    borderRadius: 2,
    top: 8,
    borderColor: colors.greyColor,
    backgroundColor: colors.greyColor,
  },
  textStyle: {
    fontFamily: 'IBMPlexSerif-MediumItalic',
    color: colors.black,
    fontSize: 16,
  },
  containerStyle: {
    backgroundColor: colors.greyColor,
    width: 326,
    borderColor: colors.greyColor,
    marginTop: 18,
    borderRadius: 2,
  },
});

export default function Dropdown() {
  const {
    setDropdownOpen,
    collectionList,
    articlesFormData,
    setArticlesFormData,
  } = useContext(MainContext);

  const formattedList = collectionList.map((collection, index) => {
    return {value: collection.id, label: collection.label, key: index};
  });

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState(formattedList);

  const openDropdown = e => {
    setOpen(e);
    setDropdownOpen(e);
  };

  const setDropdownType = callback => {
    setArticlesFormData({
      ...articlesFormData,
      collectionListId: callback(articlesFormData.collectionListId),
    });
  };

  return (
    <DropDownPicker
      open={open}
      value={articlesFormData.collectionListId}
      items={items}
      setOpen={e => openDropdown(e)}
      setValue={setDropdownType}
      setItems={setItems}
      style={styles.dropdown}
      textStyle={styles.textStyle}
      dropDownContainerStyle={styles.containerStyle}
      dropDownDirection="AUTO"
      bottomOffset={100}
    />
  );
}
