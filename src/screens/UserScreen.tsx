import React, { useState, useEffect } from 'react';
import {
  View, 
  TextInput, 
  Button, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { addUser, selectAllUsers } from '../features/userSlice';
import { UserCardType } from '../types';
import { MAIN_BG_COLOR } from '../constants/constants';


const DEFAULT_PIC_URI = 'https://picsum.photos/200';
const initialUserDetails = {
  firstName: '',
  lastName: '',
  email: '',
  location: '',
  gender: 'Female',
  imageUrl: DEFAULT_PIC_URI
}

const UserScreen = ({ route }) => {
  const userIndex = route?.params?.userIndex;
  const NEW_USER = userIndex === -1 || !userIndex;
  const EXIST_USER = userIndex > -1;

  const [userDetails, setUserDetails] = useState(initialUserDetails);

  const allUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const changeText = (inputKey: string, text: string) => {
    setUserDetails({
      ...userDetails,
      [inputKey]: text
    })
  }

  const textFieldValidation = () => {
    const { firstName, lastName, email, location, gender, imageUrl} = userDetails;
    if (!firstName || !lastName || !email || !location || !gender || imageUrl) {
      Alert.alert('All fields are required');
      return false;
    }
    return true;
  }

  const handleSubmit = () => {
    const { firstName, lastName, email, location, gender, imageUrl} = userDetails;
    if (!textFieldValidation) {
      return;
    }

    const [street, city, country] = location.split(',');
    const [stNum] = street.split(' ');
    const stName = stNum.length + 1 < street.length ? street.substring(stNum.length + 1) : '';

    
    const user: UserCardType = {
      name: {
        first: firstName,
        last: lastName,
        title: gender === 'Male' ? 'Mr' : 'Mrs'
      },
      location: {
        street: {
          number: Number(stNum),
          name: stName
        },
        city: city.trim(),
        country: country.trim()
      },
      email,
      picture: {
        medium: imageUrl
      }
    };


    if (NEW_USER) {
      dispatch(addUser(user));
    }

    navigation.goBack();
  };

  useEffect(() => {
    if (EXIST_USER) {
      const { name: { first, last, title }, location, email } = allUsers[userIndex];   
      setUserDetails({
        ...userDetails,
        firstName: first,
        lastName: last,
        email,
        location,
        gender: title.charAt(0).toUpperCase()
      })
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: userDetails.imageUrl }}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={userDetails.firstName}
          onChangeText={(text) =>changeText("firstName", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={userDetails.lastName}
          onChangeText={(text) =>changeText("lastName", text)}
        />
          <View style={styles.checkboxContainer}>
            <Text style={styles.gender}>Gender</Text>
          <TouchableOpacity
            style={[
              styles.checkbox,
              userDetails.gender === 'Male' ? styles.checkboxSelected : null,
            ]}
            onPress={() => changeText("gender", 'Male')}
          >
            <Text style={styles.checkboxLabel}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.checkbox,
              userDetails.gender === 'Female' ? styles.checkboxSelected : null,
            ]}
            onPress={() => changeText("gender", 'Female')}
          >
            <Text style={styles.checkboxLabel}>Female</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={userDetails.email}
          onChangeText={(text) =>changeText("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="3798 Rue Duguesclin, lyon, France"
          value={userDetails.location}
          onChangeText={(text) =>changeText("location", text)}
        />
        <Button title="Save Changes" onPress={handleSubmit} />
      </View>
    </View>
  )
}

export default UserScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: MAIN_BG_COLOR
  },
  profileContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  formContainer: {
    width: '100%',
  },
  gender: { 
    textAlign: 'center', 
    position: 'absolute', 
    left: 2
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checkboxSelected: {
    backgroundColor: '#ccc',
  },
});