import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailScreen = () => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

export default PlaceDetailScreen;

PlaceDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('placeTitle'),
  };
};

const styles = StyleSheet.create({});
