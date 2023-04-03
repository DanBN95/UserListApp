import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button as ButtonType } from '../types'


const Button = ({ onPress, title, customStyle }: ButtonType) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={[customStyle]}
    >
        <Text>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})