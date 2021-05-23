import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Icon from 'react-native-remix-icon';

import AppModal from '../common/Modal';
import BottomSheet from '../common/BottomSheet';
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    borderRadius: 28,
  },
});

export default function AddIcon() {
  const {
    collectionList,
    openModal,
    setOpenModal,
    setModalType,
    showBottomSheet,
    setShowBottomSheet,
    setBottomSheetType,
  } = useContext(MainContext);

  const onAddButtonClick = () => {
    if (collectionList.length > 0) {
      setShowBottomSheet(true);
      setBottomSheetType('collection');
    } else {
      setOpenModal(true);
      setModalType('collection');
    }
  };
  return (
    <View>
      {openModal === true && <AppModal />}
      {showBottomSheet === true && <BottomSheet />}
      <TouchableOpacity
        style={styles.container}
        onPress={() => onAddButtonClick()}>
        <Icon name="add-fill" size="30" color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}
