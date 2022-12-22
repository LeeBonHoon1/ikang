import React from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

type MainInScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({navigation}: MainInScreenProps) => {
  const isIos = Platform.OS === 'ios';
  const dispatch = useAppDispatch();
  const isTeacher = useSelector((state: RootState) =>
    state.user.sortation === 1 ? true : false,
  );

  const goNotice = () => {
    navigation.navigate('Notice');
  };
  const goSearch = () => {
    navigation.navigate('Search');
  };

  const logout = () => {
    dispatch(
      userSlice.actions.setUser({
        email: '',
        name: '',
        number: '',
        password: '',
        sortation: '',
        userIdx: '',
      }),
    );
  };
  return (
    <View style={styles.container}>
      <Text style={isIos ? styles.iosLogout : styles.logout}>
        <Icon
          name="log-out-outline"
          size={40}
          color="#f4a555"
          onPress={() =>
            Alert.alert(
              '알림',
              '로그아웃 하시겠습니까?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed!'),
                },
                {text: 'OK', onPress: logout},
              ],
              {cancelable: false},
            )
          }
        />
      </Text>
      <View style={styles.contents}>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="megaphone-outline"
              size={70}
              color="#f4a555"
              onPress={goNotice}
            />
          </Text>
          <Text>공지사항</Text>
        </View>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="person-outline"
              size={70}
              color="#f4a555"
              onPress={goSearch}
            />
            ;
          </Text>
          <Text>회원검색</Text>
        </View>
      </View>
      {isTeacher ? (
        <View style={styles.contents}>
          <View style={styles.icon}>
            <Text>
              <Icon
                name="chatbubble-ellipses-outline"
                size={70}
                color="#f4a555"
              />
            </Text>
            <Text>알림톡</Text>
          </View>
          <View style={styles.icon}>
            <Text>
              <Icon name="person-add-outline" size={70} color="#f4a555" />;
            </Text>
            <Text>회원승인</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contents: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 40,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  iosLogout: {
    position: 'absolute',
    top: 45,
    right: 15,
  },
});

export default Main;
