import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { UserCardType } from '../types';
// import { PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
// import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerTypesCompat';

const UserCard: React.FC<UserCardType> = ({ user }) => {

    // const translateX = useSharedValue(0);
    const { name, location, picture: { medium: imageUrl }} = user;

    const { title, first, last } = name;
    const { street: { number, name: streetName }, city, country } = location;

    const fullName = `${title}. ${first} ${last}`;
    const fullLocation = `${number} ${streetName} Street, ${city}, ${country}`;

    // const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    //     onActive: (event) => {
    //         translateX.value = event.translationX
    //     },
    //     onEnd: () => {}
    // })

    // const rStyle = useAnimatedStyle(() => ({
    //     transform: [{
    //         translateX: translateX.value
    //     }]
    // }))
    

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
    // <PanGestureHandler>
    //     <Animated.View style={[styles.cardContainer, rStyle]}>
    //         <Animated.View style={styles.imageContainer}>
    //             <Image source={{ uri: imageUrl }} style={styles.imageStyle} resizeMode='contain' />
    //         </Animated.View>
    //         <Animated.View style={styles.textContainer}>
    //             <Text style={styles.fullName}>{fullName}</Text>
    //             <Text style={styles.location}>{fullLocation}</Text>
    //         </Animated.View>
    //     </Animated.View>
    // </PanGestureHandler>
  )
}

export default UserCard

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 100,
        // for ios: 
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 20
        },
        // for android:
        elevation: 3,
        marginVertical: 3
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
        marginLeft: 1,
        width: '80%'
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