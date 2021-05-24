import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {getLinkPreview} from 'link-preview-js';
import {displayToast} from '../config/functions';

export const MainContext = createContext();

export const MainContextProvider = ({children}) => {
  const [showHeaderButtons, setShowHeaderButtons] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('collection');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isToastVisible, setToastVisibility] = useState(false);
  const [collectionFormData, setCollectionFormData] = useState({
    label: '',
  });
  const [articlesFormData, setArticlesFormData] = useState({
    collectionListId: null,
    title: '',
    imageURL: '',
    url: '',
    isRead: false,
    id: 'init_id',
  });
  const [collectionList, setCollectionList] = useState([{}]);
  const [articlesList, setArticleList] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState('collection');
  const [articleId, setArticleId] = useState('init_id');
  const [collectionId, setCollectionId] = useState('init_id');
  const [isEditCollection, setEditCollection] = useState(false);
  const [itemUrl, setItemUrl] = useState('');
  const [isEditArticle, setEditArticle] = useState(false);

  const addCollection = async () => {
    try {
      const label = collectionFormData.label;
      const existingData = await AsyncStorage.getItem('clippyData');
      const existingDataParsed = JSON.parse(existingData);
      const id = uuid.v4();
      const collectionRecord = {
        id,
        label,
      };
      const updatedFormData = [...existingDataParsed, collectionRecord];
      const modifiedData = [...collectionList.concat(collectionRecord)];
      await AsyncStorage.setItem('clippyData', JSON.stringify(updatedFormData));
      setCollectionList(modifiedData);
      displayToast('Collection added successfully');
    } catch (err) {
      Alert.alert(
        'Could not create the collection.',
        'Please try again later.',
      );
    }
  };

  const setEditData = () => {
    if (collectionList) {
      const editedData = collectionList.filter(
        collection => collection.id === collectionId,
      )[0];
      setCollectionFormData({
        label: editedData.label,
      });
    }
  };

  const editCollection = async () => {
    try {
      const label = collectionFormData.label;

      let editedArray = collectionList;

      const indexOfRecordToEdit = collectionList.findIndex(
        collection => collection.id === collectionId,
      );
      editedArray[indexOfRecordToEdit] = {
        collectionId,
        label,
      };

      setCollectionList(editedArray);
      await AsyncStorage.setItem('clippyData', JSON.stringify(editedArray));
      displayToast('Collection edited successfully');
    } catch (err) {
      Alert.alert('Could not edit the collection.', 'Please try again later.');
    }
  };

  const deleteCollection = async () => {
    try {
      const updatedCollectionData = collectionList.filter(
        collection => collection.id !== collectionId,
      );

      if (articlesList) {
        const updatedArticlesList = articlesList.filter(
          article => article.collectionListId !== collectionId,
        );
        await AsyncStorage.setItem(
          'articleData',
          JSON.stringify(updatedArticlesList),
        );
        setArticleList(updatedArticlesList);
      }

      await AsyncStorage.setItem(
        'clippyData',
        JSON.stringify(updatedCollectionData),
      );
      setCollectionList(updatedCollectionData);
      displayToast('Collection deleted successfully');
    } catch (err) {
      Alert.alert(
        'Could not delete the collection.',
        'Please try again later.',
      );
    }
  };

  const deleteArticle = async () => {
    try {
      const updatedArticlesList = articlesList.filter(
        article => article.id !== articleId,
      );
      await AsyncStorage.setItem(
        'articleData',
        JSON.stringify(updatedArticlesList),
      );
      setArticleList(updatedArticlesList);
      displayToast('Article deleted successfully');
    } catch (err) {
      Alert.alert('Could not delete the article.', 'Please try again later.');
    }
  };

  const addArticles = async () => {
    try {
      const data = await getArticleData();

      const title = data.title;
      const url = articlesFormData.url;
      const imageUrl = data.favicons[1];
      const collectionListId = articlesFormData.collectionListId;
      const isRead = articlesFormData.isRead;
      const id = uuid.v4();

      const articleItem = {
        id,
        collectionListId,
        title,
        url,
        imageUrl,
        isRead,
      };

      const modifiedData = [...articlesList.concat(articleItem)];

      updateAsyncStorage(articleItem);
      setArticleList(modifiedData);

      setEditArticle(false);
      setArticlesFormData({
        collectionListId: null,
        title: '',
        url: '',
        imageUrl: '',
        id: 'init_id',
        isRead: false,
      });

      setOpenModal(false);
      displayToast('Article added successfully');
    } catch (err) {
      Alert.alert('Could not add the articles', 'Please try again later.');
    }
  };

  const getArticleData = async () => {
    try {
      const urlData = await getLinkPreview(articlesFormData.url);
      return urlData;
    } catch (err) {
      Alert.alert('Invalid URL', 'Please enter a valid URL.');
    }
  };

  const updateAsyncStorage = async articleItem => {
    try {
      const existingData = await AsyncStorage.getItem('articleData');
      const existingDataParsed = JSON.parse(existingData);
      const updatedFormData =
        existingDataParsed === null
          ? [articleItem]
          : [...existingDataParsed, articleItem];

      await AsyncStorage.setItem(
        'articleData',
        JSON.stringify(updatedFormData),
      );
      setOpenModal(false);
    } catch (err) {
      Alert.alert('Could not add the article', 'Please try again later.');
    }
  };

  const convertToSectionDataFormat = () => {
    const articleList = articlesList.filter(
      article => article.collectionListId === collectionId,
    );
    if (articleList.length === 0) {
      return [];
    } else {
      let convertedData = [];
      let data = [];

      const readItems = articleList.filter(item => item.isRead === true);
      const unReadItems = articleList.filter(item => item.isRead === false);

      convertedData.push({
        title: 'Unread',
        data: unReadItems,
      });

      data.push({
        title: 'Read',
        data: readItems,
      });

      const modifiedList = [...convertedData.concat(data)];
      return modifiedList;
    }
  };

  const markAsRead = async () => {
    try {
      let editedArray = articlesList;

      const indexOfRecordToEdit = articlesList.findIndex(
        article => article.id === articleId,
      );
      const articleToEdit = articlesList.filter(
        article => article.id === articleId,
      )[0];

      const id = articleId;
      const collectionListId = articleToEdit.collectionListId;
      const title = articleToEdit.title;
      const url = articleToEdit.url;
      const imageUrl = articleToEdit.imageUrl;
      const isRead = true;

      editedArray[indexOfRecordToEdit] = {
        id,
        collectionListId,
        title,
        url,
        imageUrl,
        isRead,
      };

      setArticleList(editedArray);
      await AsyncStorage.setItem('articleData', JSON.stringify(editedArray));
      displayToast('Article marked as read');
    } catch (err) {
      Alert.alert(
        'Could not mark the article as read',
        'Please try again later.',
      );
    }
  };

  const onEditPress = () => {
    if (articlesList) {
      const editedData = articlesList.filter(item => item.id === articleId)[0];
      setArticlesFormData({
        id: editedData.id,
        collectionListId: editedData.collectionListId,
        title: editedData.title,
        url: editedData.url,
        imageUrl: editedData.imageUrl,
        isRead: editedData.isRead,
      });
    }
  };

  const editArticle = async () => {
    try {
      const data = await getArticleData();

      let editedArray = articlesList;

      const articleToEdit = articlesList.filter(
        article => article.id === articleId,
      )[0];

      const id = articleId;
      const collectionListId = articlesFormData.collectionListId;
      const title = data.title;
      const url = articlesFormData.url;
      const imageUrl = data.favicons[1];
      const isRead =
        articleToEdit.url !== articlesFormData.url
          ? false
          : articleToEdit.isRead;

      const indexOfRecordToEdit = articlesList.findIndex(
        article => article.id === articleId,
      );
      editedArray[indexOfRecordToEdit] = {
        id,
        collectionListId,
        title,
        url,
        imageUrl,
        isRead,
      };
      setArticleList(editedArray);

      await AsyncStorage.setItem('articleData', JSON.stringify(editedArray));
      setEditArticle(false);
      setArticlesFormData({
        collectionListId: null,
        title: '',
        url: '',
        imageUrl: '',
        id: 'init_id',
        isRead: false,
      });
      setOpenModal(false);
      displayToast('Article edited successfully');
    } catch (err) {
      Alert.alert('Could not edit the article ', 'Please try again later.');
    }
  };

  const contextValue = {
    showHeaderButtons,
    openModal,
    modalType,
    collectionFormData,
    articlesFormData,
    dropdownOpen,
    collectionList,
    articlesList,
    showBottomSheet,
    bottomSheetType,
    articleId,
    collectionId,
    isEditCollection,
    isEditArticle,
    itemUrl,
    isToastVisible,
    setToastVisibility,
    setItemUrl,
    markAsRead,
    updateAsyncStorage,
    addArticles,
    setEditArticle,
    editCollection,
    deleteCollection,
    setEditData,
    setEditCollection,
    setCollectionId,
    addCollection,
    setArticleId,
    setBottomSheetType,
    setShowBottomSheet,
    setArticleList,
    setCollectionList,
    setDropdownOpen,
    setArticlesFormData,
    setCollectionFormData,
    setModalType,
    setOpenModal,
    setShowHeaderButtons,
    convertToSectionDataFormat,
    deleteArticle,
    onEditPress,
    editArticle,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
