import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import Notice from './src/pages/Notice';
import Search from './src/pages/Search';
import Main from './src/pages/Main';
import SignupEmail from './src/pages/SignUpEmail';
import SignUpPassword from './src/pages/SignUpPassword';
import SignUpPhone from './src/pages/SignUpPhone';
import SignUpName from './src/pages/SignUpName';
import AddNotice from './src/pages/AddNotice';
import NoticeDetail from './src/pages/NoticeDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from './src/store/reducer';
import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useCallback} from 'react';
import {useAppDispatch} from './src/store';
import firebaseSlice from './src/slices/firebase';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export type RootStackParamList<T = Array<string | number>> = {
  SignIn: undefined;
  SignUp: Partial<{
    user: string;
  }>;
  SignUpEmail: Partial<{
    sortation?: string;
  }>;
  SignUpPassword: Partial<{
    sortation?: number;
    email?: string;
  }>;
  SignUpPhone: Partial<{
    sortation?: number;
    email?: string;
    password?: string;
  }>;
  SignUpName: Partial<{
    sortation?: number;
    email?: string;
    password?: string;
    number?: string;
  }>;
  Main: undefined;
  Notice: undefined;
  Search: undefined;

  AddNotice: undefined;
  NoticeDetail: {
    data: T[];
  };
};

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch();

  const getFcmToken = useCallback(async () => {
    const fcmToken = await messaging().getToken();
    dispatch(
      firebaseSlice.actions.setFirebaseToken({
        token: fcmToken,
      }),
    );
  }, [dispatch]);

  const getMessage = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const jsonMessage = JSON.stringify(remoteMessage);
      await EncryptedStorage.setItem('message', jsonMessage);
      // console.log('[Remote Message] ', JSON.stringify(remoteMessage));
      // Alert.alert(
      //   remoteMessage?.notification?.title || '',
      //   remoteMessage?.notification?.body || '',
      // );
    });
    return unsubscribe;
  };
  interface MessageType {
    storageMessage: object;
  }
  useEffect(() => {
    getFcmToken();
    const storageMessage = EncryptedStorage.getItem('key');
    console.log('---------');
    console.log(storageMessage);
    console.log('---------');
  }, [getFcmToken]);

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return isLoggedIn ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddNotice"
        component={AddNotice}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NoticeDetail"
        component={NoticeDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpEmail"
        component={SignupEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPassword"
        component={SignUpPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPhone"
        component={SignUpPhone}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpName"
        component={SignUpName}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppInner;
