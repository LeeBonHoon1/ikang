import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import APIs from '../lib/APIs';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

interface NOTICE_TYPE {
  CONTENT: string;
  NOTICE_IDX: number;
  TITLE: string;
}

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;

// const DESC_MAX_LENGTH = 100;

const Notice = ({navigation}: SignInScreenProps) => {
  // const [notice, setNotice] = useState([]);
  const isTeacher = useSelector(
    (state: RootState) => state.user.sortation === 1,
  );

  // useEffect(() => {
  //   APIs.getNoticeList().then(res => {
  //     setNotice(res);
  //   });
  // }, [notice]);
  const goBack = () => {
    navigation.navigate('Main');
  };
  const goAddNotice = () => {
    navigation.navigate('AddNotice');
  };

  const DATA = [
    {
      NOTICE_IDX: 1,
      TITLE: '수학반 개편1',
      CONTENT:
        '다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, 쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요,다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, ',
    },
    {
      NOTICE_IDX: 2,
      TITLE: '수학반 개편2',
      CONTENT:
        '쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요, 다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, 쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요,다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, 쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요,',
    },
    {
      NOTICE_IDX: 3,
      TITLE: '수학반 개편3',
      CONTENT:
        '다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, 쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요,다들 지각하지 말고 똑바로 다니세요, 수업시간에 자지 마세요, 쉬는시간에 담배피러 가지 마세요, 옆사람과 떠들지 마세요, 컨닝 하지 마세요, 학원 내 연애 하지 마세요, 쳐먹던 거 교실 내 반입 하지 마세요, 담배피는 사람 보이면 신고하세요,',
    },
    {NOTICE_IDX: 4, TITLE: 'TITLE', CONTENT: '디스 앱솔 풀힐 아스파 서먼'},
    {NOTICE_IDX: 5, TITLE: 'TITLE', CONTENT: '키드밀리 릴러말즈 전상근 아이유'},
    {NOTICE_IDX: 6, TITLE: 'TITLE', CONTENT: '디스 앱솔 풀힐 아스파 서먼'},
    {NOTICE_IDX: 7, TITLE: 'TITLE', CONTENT: '키드밀리 릴러말즈 전상근 아이유'},
    {NOTICE_IDX: 8, TITLE: 'TITLE', CONTENT: '디스 앱솔 풀힐 아스파 서먼'},
    {NOTICE_IDX: 9, TITLE: 'TITLE', CONTENT: '키드밀리 릴러말즈 전상근 아이유'},
  ];

  const isIos = Platform.OS === 'ios';

  return (
    <View style={isIos ? styles.iosContainer : styles.container}>
      <StatusBar hidden={false} />
      <ScrollView>
        <ImageBackground
          source={require('../img/notice.png')}
          style={styles.logo}
          resizeMode="contain">
          <View style={styles.arrow}>
            <Icon
              name="chevron-back-outline"
              size={40}
              color="#3f3d56"
              onPress={goBack}
            />
          </View>
          {isTeacher ? (
            <View style={styles.addNotice}>
              <Icon
                name="add-circle-outline"
                size={40}
                color="#3f3d56"
                onPress={goAddNotice}
              />
            </View>
          ) : null}
        </ImageBackground>
        <View style={styles.notice}>
          {DATA?.length
            ? DATA.map((item: NOTICE_TYPE, idx) => {
                return (
                  <View style={styles.contents} key={item.NOTICE_IDX}>
                    <Text
                      style={styles.noticeTitle}
                      onPress={() => {
                        navigation.navigate('NoticeDetail', {
                          idx: idx,
                          data: DATA,
                        });
                      }}>
                      {item.TITLE}
                    </Text>
                  </View>
                );
              })
            : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'white',
    paddingTop: 20,
    position: 'relative',
  },
  iosContainer: {
    display: 'flex',
    backgroundColor: 'white',
    paddingTop: 50,
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    top: 10,
  },
  addNotice: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logo: {
    justifyContent: 'center',
    height: 200,
  },
  notice: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  contents: {
    width: '90%',
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    // borderRadius: 15,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  noticeImage: {
    backgroundColor: '#f9a826',
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  noticeTitle: {
    fontSize: 20,
    marginTop: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#3f3d56',
  },
  noticeDesc: {
    marginLeft: 40,
    fontSize: 15,
    marginTop: 15,
    width: '75%',
    color: '#92a1b8',
  },
});

export default Notice;
