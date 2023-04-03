import React, { useState } from 'react'
import { StyleSheet, TextInput, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { debounce } from "lodash";
import { SearchBarInterface } from '../types';
import { PASTEL_PINK } from '../constants/constants';

const SEARCH_PLACE_HOLDER = 'Find User'

const SearchBar = ({ filter }: SearchBarInterface) => {

    const [text, setText] = useState('');

    const handleChangeText = (newText: string) => {
        setText(newText)
        filter(newText);
    }
    
  return (
    <View style={styles.container}>
        <View style={styles.searchBox}>
        <Feather name="search" size={30} color="#900" />
            <TextInput 
                style={styles.text} 
                value={text}
                placeholder={SEARCH_PLACE_HOLDER}
                onChangeText={handleChangeText}
            />
        </View>
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        backgroundColor: PASTEL_PINK,
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        marginHorizontal: 45,
        elevation: 5,
        borderRadius: 5
    },
    searchBox: {
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        color: '#000',
        marginLeft: 3,
        padding: 7,
        width: '70%'
    }
})