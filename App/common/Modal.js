import React, {useContext} from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import CreateCollection from '../components/CreateCollection';
import CreateClip from '../components/CreateClip';

export default function AppModal() {
  const {openModal, modalType, isEditArticle, isEditCollection} =
    useContext(MainContext);

  const height = modalType === 'collection' ? 148 : 240;

  const modalHeaderTitle =
    modalType === 'collection'
      ? isEditCollection
        ? 'Edit the collection'
        : 'Create a collection'
      : isEditArticle
      ? 'Edit the clip'
      : 'Create a clip';

  return (
    <Modal animationType={'slide'} transparent={true} visible={openModal}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.text}>{modalHeaderTitle}</Text>
        </View>
        <View style={{height: height}}>
          {modalType === 'collection' ? <CreateCollection /> : <CreateClip />}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    width: '90%',
    left: 20,
    right: 20,
    top: 224,
  },
  modalHeader: {
    height: 40,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontFamily: 'IBMPlexSerif-MediumItalic',
    textAlign: 'center',
    fontSize: 18,
  },
});
