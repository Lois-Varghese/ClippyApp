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

export default function Dropdown({value1, onChange}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'JavaScript', value: 'js'},
    {label: 'TypeScript', value: 'ts'},
    {label: 'fg', value: 'jfgs'},
    {label: 'ffef', value: 'thth'},
    {label: 'efeef', value: 'jfthththgs'},
    {label: 'efeffef', value: 'jfgthths'},
    {label: 'efeef', value: 'jfththtfgs'},
    {label: 'efefef', value: 'sasaas'},
    {label: 'ththt', value: 'effefc'},
    {label: 'ththhh', value: 'rggrf'},
    {label: 'fththg', value: 'yjuj'},
    {label: 'last', value: 'jfvfvrvgs'},
  ]);
  const {setDropdownOpen} = useContext(MainContext);

  const openDropdown = e => {
    setOpen(e);
    setDropdownOpen(e);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={e => openDropdown(e)}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
      textStyle={styles.textStyle}
      dropDownContainerStyle={styles.containerStyle}
      dropDownDirection="AUTO"
      bottomOffset={100}
    />
  );
}
