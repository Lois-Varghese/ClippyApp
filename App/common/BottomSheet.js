import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import {openLink} from '../config/functions';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    width: '100%',
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
  },
  buttonStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 61,
  },
});

export default function BottomSheet() {
  const {
    showBottomSheet,
    bottomSheetType,
    setShowBottomSheet,
    setOpenModal,
    setModalType,
    itemUrl,
    deleteArticle,
    markAsRead,
    onEditPress,
    setEditArticle,
  } = useContext(MainContext);

  const handleCreateClip = () => {
    setShowBottomSheet(false);
    setOpenModal(true);
    setModalType('clip');
  };

  const handleCreateCollection = () => {
    setShowBottomSheet(false);
    setOpenModal(true);
    setModalType('collection');
  };

  const handleOpenBrowser = () => {
    openLink(itemUrl);
    setShowBottomSheet(false);
  };

  const handleMarkAsRead = () => {
    markAsRead();
    setShowBottomSheet(false);
  };

  const handleEdit = () => {
    setEditArticle(true);
    setShowBottomSheet(false);
    onEditPress();
    setOpenModal(true);
    setModalType('clip');
  };

  const handleDelete = () => {
    deleteArticle();
    setShowBottomSheet(false);
  };

  const height = bottomSheetType === 'collection' ? 140 : 258;

  return (
    <Modal
      animationType={'slide'}
      style={[styles.modal, {height: height}]}
      transparent={true}
      visible={showBottomSheet}
      backdropOpacity={0.5}
      onBackdropPress={() => setShowBottomSheet(false)}>
      {bottomSheetType === 'collection' ? (
        <>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleCreateClip()}>
            <Text>Create a clip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleCreateCollection()}>
            <Text>Create a collection</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleOpenBrowser()}>
            <Text>Open in browser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleMarkAsRead()}>
            <Text>Mark as read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleEdit()}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => handleDelete()}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
}
