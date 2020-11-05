import React, { useCallback, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';

const NewPlaceScreen = (props) => {
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitle(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback(
    (location) => {
      setSelectedLocation(location);
    },
    [setSelectedLocation]
  );

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(title, selectedImage, selectedLocation));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

export default NewPlaceScreen;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 2,
    marginBottom: 10,
  },
});
