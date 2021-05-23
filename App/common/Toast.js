import React, {useEffect, useContext, useState} from 'react-native';
import Toast from 'react-native-root-toast';
import {MainContext} from '../util/MainContext';

export default function ToastComponent({toastText}) {
  //   const {isToastVisible, setToastVisibility} = useContext(MainContext);
  const [isToastVisible, setToastVisibility] = useState(false);

  useEffect(() => {
    setTimeout(() => setToastVisibility(true), 2000); // show toast after 2s

    setTimeout(() => setToastVisibility(false), 5000); // hide toast after 5s
  }, []);

  return (
    <Toast
      visible={isToastVisible}
      position={50}
      shadow={false}
      animation={false}
      hideOnPress={true}>
      {toastText}
    </Toast>
  );
}
