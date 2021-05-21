import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';

export const MainContext = createContext();

export const MainContextProvider = ({children}) => {
  const [showHeaderButtons, setShowHeaderButtons] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('collection');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [collectionFormData, setCollectionFormData] = useState({
    label: '',
  });
  const [articlesFormData, setArticlesFormData] = useState({
    id: 'init_id',
    collectionId: 'default_id',
    label: '',
    url: '',
    isRead: false,
  });
  const [collectionList, setCollectionList] = useState([{}]);
  const [articlesList, setArticleList] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [bottomSheetType, setBottomSheetType] = useState('collection');
  const [articleId, setArticleId] = useState('init_id');
  const [collectionId, setCollectionId] = useState('init_id');
  const [editClicked, setEditClicked] = useState(false);

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
      const sortedData = [...collectionList.concat(collectionRecord)];
      await AsyncStorage.setItem('clippyData', JSON.stringify(updatedFormData));
      setCollectionList(sortedData);
    } catch (err) {
      alert('Could not create the collection. Please try again.');
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
      // setParsedData(convertToSectionDataFormat(editedArray));

      await AsyncStorage.setItem('clippyData', JSON.stringify(editedArray));
    } catch (err) {
      alert('Could not edit collection. Please try again.');
    }
  };

  const deleteCollection = async () => {
    try {
      // const collectionData = await AsyncStorage.getItem('clippyData');
      // const collectionDataParsed = JSON.parse(collectionData);
      const updatedCollectionData = collectionList.filter(
        collection => collection.id !== collectionId,
      );
      await AsyncStorage.setItem(
        'clippyData',
        JSON.stringify(updatedCollectionData),
      );
      setCollectionList(updatedCollectionData);
    } catch (err) {
      alert('Could not delete the collection. Please try again.');
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
    editClicked,
    editCollection,
    deleteCollection,
    setEditData,
    setEditClicked,
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
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
