import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { MEALS } from '../data/dummy-data';

const MealDetailsScreen = (props) => {
  const mealId = props.navigation.getParam('mealId');

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
      <Button
        title="Go Back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

MealDetailsScreen.navigationOptions = (navigationData) => {
  const mealId = navigationData.navigation.getParam('mealId');
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  return {
    headerTitle: selectedMeal.title,
  };
};

export default MealDetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
