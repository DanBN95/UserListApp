import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { UserCardType } from '../types';
import { PanGestureHandler, PanGestureHandlerProps, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RED } from '../constants/constants';

const LIST_ITEM_HEIGHT = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;

interface UserItemProps extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    user: UserCardType;
    onDeleteItem: () => void;
    onEditItem: () => void;
}
const UserCard = ({ user, onDeleteItem, onEditItem, simultaneousHandlers }: UserItemProps) => {

    const translateX = useSharedValue(0);
    const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
    const opacity = useSharedValue(1);
    const { name, location, picture: { medium: imageUrl }} = user;

    const { title, first, last } = name;
    const { street: { number, name: streetName }, city, country } = location;

    const fullName = `${title}. ${first} ${last}`;
    const fullLocation = `${number} ${streetName} Street, ${city}, ${country}`;

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: (event) => {
            translateX.value = event.translationX
        },
        onEnd: () => {
            const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
            if (shouldBeDismissed) {
                translateX.value = withTiming(-SCREEN_WIDTH);
                itemHeight.value = withTiming(0);
                opacity.value = withTiming(0, undefined, (isDone) => {
                    if (isDone && onDeleteItem) {
                        runOnJS (onDeleteItem)();
                    }
                });
            } else {
                translateX.value = withTiming(0);
            }
        }
    })

    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(
            translateX.value > -TRANSLATE_X_THRESHOLD ? 1 : 0
        )
        return { opacity };
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [{
            translateX: translateX.value,
        }]
    }))

    const rListItemContainer = useAnimatedStyle(() => {
        return {
            height: itemHeight.value,
            opacity: opacity.value
        }
    });

    const editItemHandler = () => {
        onEditItem && onEditItem();
    }
    

  return (
    <View style={[styles.listItemContainer, rListItemContainer]}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
            <AntDesign name="delete" size={LIST_ITEM_HEIGHT * 0.4} color={RED} />
        </Animated.View>
        <PanGestureHandler 
            onGestureEvent={panGesture}
            activeOffsetX={[-5,5]} 
            failOffsetY={[-5,5]}
            simultaneousHandlers={simultaneousHandlers}
        >
            <Animated.View style={[styles.cardContainer, rStyle]}>
                <TouchableOpacity
                onPress={editItemHandler}
                activeOpacity={1}
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.imageStyle} resizeMode='contain' />
                </View>
            </TouchableOpacity>
                <View style={[styles.textContainer]}>
                    <Text style={[styles.text, styles.fullName]}>{fullName}</Text>
                    <Text style={[styles.text, styles.location]}>{fullLocation} </Text>
                </View>
            </Animated.View>
        </PanGestureHandler>
    </View>
  )
}

export default UserCard

const styles = StyleSheet.create({
    listItemContainer: {
        width: '100%', 
        alignItems: 'center', 
        marginVertical: 10
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: LIST_ITEM_HEIGHT,
        // for ios: 
        shadowOpacity: 1,
        shadowOffset: {
            width: 0,
            height: 20
        },
        // for android:
        elevation: 9,
        backgroundColor: '#E5E4E2'
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
        maxWidth: '60%'
    },
    fullName: {
        fontSize: 17
    },
    location: {
        fontSize: 12
    },
    iconContainer: {
        height: LIST_ITEM_HEIGHT,
        width: LIST_ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: '5%'
    }
    
})