import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';

type MainInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpSelect'
>;

const SignUpSelect = ({navigation}: MainInScreenProps) => {
  const [isStudent, setIsStudent] = useState(false);
  const checkUser = () => {
    isStudent
      ? navigation.navigate('SignUpEmail', {sortation: 'student'})
      : navigation.navigate('SignUpEmail', {sortation: 'teacher'});
  };

  const checkStudent = () => {
    setIsStudent(true);
    checkUser();
  };

  const checkTeacher = () => {
    setIsStudent(false);
    checkUser();
  };

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="arrow-redo-circle-outline"
              size={70}
              color="#f4a555"
              onPress={checkStudent}
            />
            ;
          </Text>
          <Text>학생 회원가입</Text>
        </View>
        <View style={styles.icon}>
          <Text>
            <Icon
              name="arrow-redo-circle-outline"
              size={70}
              color="#f4a555"
              onPress={checkTeacher}
            />
            ;
          </Text>
          <Text>강사 회원가입</Text>
        </View>
      </View>
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
});

export default SignUpSelect;
