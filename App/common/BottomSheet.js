import React, {useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import colors from '../config/colors';
import {MainContext} from '../util/MainContext';
import Text from '../common/Text';
import {openLink} from '../config/functions';

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

  const height = bottomSheetType === 'collection' ? 165 : 284;
  const marginTop = bottomSheetType === 'collection' ? '78%' : '64%';

  return (
    <Modal
      animationType={'slide'}
      style={[styles.modal, {height: height, top: marginTop}]}
      transparent={true}
      visible={showBottomSheet}
      backdropOpacity={0.5}
      onBackdropPress={() => setShowBottomSheet(false)}>
      {bottomSheetType === 'collection' ? (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.collectionButton]}
            onPress={() => handleCreateClip()}>
            <Text>Create a clip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.collectionButton]}
            onPress={() => handleCreateCollection()}>
            <Text>Create a collection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.articleButtons]}
            onPress={() => handleOpenBrowser()}>
            <Text>Open in browser</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.articleButtons]}
            onPress={() => handleMarkAsRead()}>
            <Text>Mark as read</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.articleButtons]}
            onPress={() => handleEdit()}>
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, styles.articleButtons]}
            onPress={() => handleDelete()}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.white,
    width: '100%',
    marginLeft: 0,
    position: 'absolute',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionButton: {
    height: 82,
    bottom: 12,
  },
  articleButtons: {
    height: 62,
    bottom: 16,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
