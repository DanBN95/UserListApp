import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { UserCardType } from '../types';

const UserCard = ({ user }: UserCardType) => {

    const { name, location, picture: { medium: imageUrl }} = user;

    const { title, first, last } = name;
    const { street: { number, name: streetName }, city, country } = location;

    const fullName = `${title}. ${first} ${last}`;
    const fullLocation = `${number} ${streetName} Street, ${city}, ${country}`;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.imageStyle} resizeMode='contain' />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fullName}>{fullName}</Text>
        <Text style={styles.location}>{fullLocation}</Text>
      </View>
    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        borderWidth: 1,
    },
    imageContainer: {
        display: 'flex',
        width: 100,
        marginLeft: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 60,
        height: 60,
        borderRadius: 100
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginLeft: 1
    },
    text: {
        
    },
    fullName: {
        fontSize: 17
    },
    location: {
        fontSize: 12
    }
    
})