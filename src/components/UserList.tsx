import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import dataTest from '../../dataTest.json';
import { UserCardType } from '../types';
import UserCard from './UserCard';

const UserList = () => {

    const renderUserListItem = (userItem: any, index: number) => {
        const user = userItem.item;
        console.log(user)
        return (
            <UserCard key={`${index}-${user.login?.uuid}`} user={user} />
        )
    }
    

    console.log(dataTest.results[0].login.uuid)

  return (
    <View style={styles.listContainer}>
        <FlatList 
            data={dataTest.results}
            renderItem={renderUserListItem}
        />
    </View>
  )
}

export default UserList

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        marginHorizontal: 3
    }
})