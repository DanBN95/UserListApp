import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import SearchBar from '../components/SearchBar';
import UserList from '../components/UserList';
import dataTest from '../../dataTest.json';

const HomeScreen = () => {

  // get userData from selector

  const [criteria, setCriteria] = useState('');

  const filteredData = useMemo(() => {
    // console.log('### criteria', criteria)
    return dataTest.results.filter(user => {
      // need to be changed to full name and full location
      if (!user.name.first.includes(criteria) && !user.location.city.includes(criteria)) {
        return false;
      }
      return true;
  })
}, [criteria])

// console.log('### filteredDAta:',filteredData)

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