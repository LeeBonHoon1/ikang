import React from 'react';
import {Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'Notice'>;

const NoticeDetail = ({navigaion, route}) => {
  const data = route.params.data.filter(item => {
    return item.NOTICE_IDX === route.params.idx + 1;
  });

  return (
    <View>
      {data.map((item, idx) => {
        return (
          <View key={idx}>
            <Text>{item.TITLE}</Text>
            <Text>{item.CONTENT}</Text>
            <Text>{item.TITLE}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default NoticeDetail;
