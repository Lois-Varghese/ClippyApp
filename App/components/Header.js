import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Text from '../common/Text';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Icon from 'react-native-remix-icon';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red,
    alignItems: 'center',
    height: 50,
    paddingLeft: 18,
    paddingRight: 17,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: colors.white,
    fontWeight: '700',
    marginRight: 74,
  },
  edit: {
    marginRight: 18,
  },
});

export default function Header({navigation}) {
  const {
    showHeaderButtons,
    setShowHeaderButtons,
    setOpenModal,
    setModalType,
    setEditClicked,
    setEditData,
    deleteCollection,
  } = useContext(MainContext);
  const leftMargin = showHeaderButtons ? 127 : 146;

  const handleDelete = () => {
    Alert.alert('Delete', 'Do you want to delete this collection?', [
      {text: 'NO', onPress: () => {}},
      {
        text: 'YES',
        onPress: () => {
          deleteCollection();
          navigation.navigate('CollectionList');
          setShowHeaderButtons(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {showHeaderButtons === true && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CollectionList');
            setShowHeaderButtons(false);
          }}>
          <Icon name="ri-arrow-left-s-line" size="24" color={colors.white} />
        </TouchableOpacity>
      )}

      <Text style={[styles.headerText, {marginLeft: leftMargin}]}>Clippy</Text>
      {showHeaderButtons === true && (
        <TouchableOpacity
          onPress={() => {
            setEditData();
            setEditClicked(true);
            setModalType('collection');
            setOpenModal(true);
          }}>
          <Icon
            name="ri-edit-line"
            size="24"
            color={colors.white}
            style={styles.edit}
          />
        </TouchableOpacity>
      )}
      {showHeaderButtons === true && (
        <TouchableOpacity onPress={() => handleDelete()}>
          <Icon name="ri-delete-bin-4-line" size="24" color={colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
}
