import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import MealItem from '../components/MealItem';

import { CATEGORIES, MEALS } from '../data/dummy-data';

const CategoryMealsScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'MealDetails',
            params: {
              mealId: itemData.item.id,
            },
          });
        }}
      />
    );
  };

  const catId = props.navigation.getParam('categoryId');

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

export default CategoryMealsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});
