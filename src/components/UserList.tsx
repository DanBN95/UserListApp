import React, { useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import UserCard from './UserCard';
import { useDispatch } from "react-redux";
import { deleteUserByIndex } from '../features/userSlice';
import { FlatList } from 'react-native-gesture-handler';

const UserList = ({ data }) => {

    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    const renderUserListItem = (user: any, index: number) => {

        const key = user?.login?.uuid;

        return (
            <UserCard 
                user={user} 
                key={key} 
                onDeleteItem={() => onDeleteItem(index)}
                simultaneousHandlers={scrollRef}
            />
        )
    }

    const onDeleteItem = (userIndexToDelete: number) => {
        dispatch(deleteUserByIndex(userIndexToDelete))
    }
    

  return (
    <View style={styles.listContainer}>
        <FlatList 
            ref={scrollRef}
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
        marginHorizontal: 6,
    },
    list: {
        marginVertical: 10,
        flex: 1
    }
})