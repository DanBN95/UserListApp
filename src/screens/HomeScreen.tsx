import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import UserCard from '../components/UserCard';
import UserList from '../components/UserList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <UserList />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})