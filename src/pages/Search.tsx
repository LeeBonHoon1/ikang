import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('all');
  const [items, setItems] = useState([
    {label: '전체', value: 'all'},
    {label: '이름', value: 'name'},
    {label: '연락처', value: 'number'},
    {label: '이메일', value: 'email'},
  ]);

  const param = {
    title: value,
  };

  console.log(param);
  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: 'red',
    height: '100%',
  },
  dropdown: {
    width: '30%',
  },
});

export default Search;
