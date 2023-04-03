import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import { fetchUsers, selectAllUsers } from '../features/userSlice';
import { UserCardType } from '../types';

const HomeScreen = () => {

  const dispatch = useDispatch();
  const allUsers = useSelector<UserCardType[]>(selectAllUsers);
  console.log('### all Users!', allUsers)
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
}, [criteria, allUsers?.length])

console.log('### filteredDAta:',filteredData)

useEffect(() => {
  dispatch(fetchUsers());
}, [])

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar filter={setCriteria} />
      <UserList data={filteredData} />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFBFF',
    }
})