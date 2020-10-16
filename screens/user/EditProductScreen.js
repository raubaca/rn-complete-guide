import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UPDATE = 'UPDATE';

const formReducer = (state, action) => {
  if (action.type === UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValid = {
      ...state.inputValid,
      [action.input]: action.value,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValid) {
      updatedFormIsValid = updatedFormIsValid && updatedValid[key];
    }
    return {
      inputValues: updatedValues,
      inputValid: updatedValid,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValid: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input', 'Please check errors', [{ text: 'Ok' }]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsActions.updateProduct(
            prodId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            +formState.inputValues.price
          )
        );
      }
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [
    dispatch,
    prodId,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
  ]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (input, value, isValid) => {
      dispatchFormState({ type: UPDATE, value, isValid, input });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title"
          autoCapitalize="words"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ''}
          isValid={!!editedProduct}
        />
        <Input
          id="imageUrl"
          label="Image URL"
          errorText="Please enter a valid image url"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ''}
          isValid={!!editedProduct}
          autoCapitalize="words"
        />
        {!editedProduct && (
          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.price : ''}
            isValid={!!editedProduct}
            autoCapitalize="words"
            keyboardType="decimal-pad"
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ''}
          isValid={!!editedProduct}
          autoCapitalize="words"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
        />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    headerTitle: navData.navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
