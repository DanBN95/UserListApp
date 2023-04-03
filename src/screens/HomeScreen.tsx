import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import { fetchUsers, selectAllUsers } from '../features/userSlice';
import { UserCardType } from '../types';
import { MAIN_BG_COLOR } from '../constants/constants';

const HomeScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const allUsers = useSelector<UserCardType[]>(selectAllUsers);
  const [criteria, setCriteria] = useState('');

  const filteredData = useMemo(() => {
    return allUsers.filter((user: UserCardType) => {
      const { name, location } = user;
      const { first, last } = name;
      const { street: { number, name: streetName }, city, country } = location;

      const fullName = `${first} ${last}`;
      const fullLocation = `${number} ${streetName}, ${city}, ${country}`;

      if (!fullName.toLowerCase().includes(criteria) && !fullLocation.toLowerCase().includes(criteria)) {
        return false;
      }
      return true;
  })
}, [criteria, allUsers, allUsers?.length])

const onPressAddUser = () =>{
  navigation.push('UserScreen')}

useEffect(() => {
  dispatch(fetchUsers());
}, [])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar filter={setCriteria} />
      <Button onPress={onPressAddUser} title="Add User" customStyle={styles.addBtn}/>
      <View style={styles.divider} />
      <UserList data={filteredData} />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: MAIN_BG_COLOR,
    },
    addBtn: {
      alignSelf: 'flex-end',
      padding: 8,
      margin: 10,
    },
    divider: {
      width: '100%',
      borderWidth: 0.6,
      borderBottomColor: '#E5E4E2',
    }
})