import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Platform,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import axios from 'axios';

interface NOTICE_TYPE {
  CONTENT: string;
  NOTICE_IDX: number;
  TITLE: string;
}

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;

// const DESC_MAX_LENGTH = 100;
const host =
  'http://ec2-18-182-33-159.ap-northeast-1.compute.amazonaws.com:3000/notice/getNoticeList';

const Notice = ({navigation}: SignInScreenProps) => {
  const [notice, setNotice] = useState([]);
  const [ios, setIos] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getNoticeList();
  }, []);

  const getNoticeList = useCallback(async () => {
    if (Platform.OS === 'ios') {
      setIos(true);
    }
    const response = await axios.get(host, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response) {
      setNotice(response.data);
    } else {
      Alert.alert('잠시 후 다시 시도해주세요');
    }
  }, [userInfo.token]);

  const goBack = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={ios ? styles.iosContainer : styles.container}>
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
        </ImageBackground>
        <View style={styles.notice}>
          {notice?.length
            ? notice.map((item: any, idx) => {
                return (
                  <View style={styles.contents}>
                    <Text
                      style={styles.noticeTitle}
                      onPress={() => {
                        navigation.navigate('NoticeDetail', {
                          idx: idx,
                          data: notice,
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
    paddingTop: 10,
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
    left: 5,
  },
  iosArrow: {
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
