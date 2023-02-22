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
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import axios from 'axios';
import {host} from '../lib/APIs';
import moment from 'moment';

interface NOTICE_TYPE {
  CONTENT: string;
  GROUP_NAME: string;
  NAME: string;
  NOTICE_IDX: number;
  REG_DATE: string;
  TITLE: string;
}

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;

const Notice = ({navigation}: SignInScreenProps) => {
  const [notice, setNotice] = useState([]);
  const [ios, setIos] = useState(false);
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user);

  const getNoticeList = useCallback(async () => {
    if (Platform.OS === 'ios') {
      setIos(true);
    }

    const response = await axios.get(`${host}/notice/getNoticeList`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    if (response) {
      setNotice(response.data);
      setLoading(true);
    } else {
      Alert.alert('잠시 후 다시 시도해주세요');
    }
  }, [userInfo.token]);

  useEffect(() => {
    getNoticeList();
  }, [getNoticeList]);

  const goBack = () => {
    navigation.navigate('Main');
  };

  return (
    <>
      {loading ? (
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
                ? notice.map((item: NOTICE_TYPE, idx: number) => {
                    return (
                      <View style={styles.contents} key={idx}>
                        <View>
                          <Text
                            style={styles.noticeTitle}
                            // onPress={e => {
                            //   console.log(e.target);
                            // }}
                            // onPress={() => {
                            //   navigation.navigate('NoticeDetail', {
                            //     data: notice,
                            //   });
                            // }}
                          >
                            {item.TITLE}
                            {item.NAME}
                          </Text>
                        </View>
                        <View>
                          <Text>
                            {moment(item.REG_DATE).format('YYYY-MM-DD')}
                          </Text>
                          <Text>{item.CONTENT}</Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      )}
    </>
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
