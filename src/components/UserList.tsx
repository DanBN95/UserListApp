import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import dataTest from '../../dataTest.json';
import { UserCardType } from '../types';
import UserCard from './UserCard';

const UserList = ({ data }: any) => {

    const renderUserListItem = (user: any, index: number) => {

        const key = user?.login?.uuid;
        console.log('key:',key);

        return (
            <UserCard user={user} key={key}/>
        )
    }
    

  return (
    <View style={styles.listContainer}>
        <FlatList 
            data={data}
            renderItem={({ item, index }) => renderUserListItem(item, index)}
            style={styles.list}
        />
    </View>
  )
}

export default UserList

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        marginHorizontal: 3,
        // marginVertical: 10
    },
    list: {
        marginVertical: 10
    }
})