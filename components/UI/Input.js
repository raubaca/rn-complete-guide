import React, { useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const CHANGE = 'CHANGE';
const BLUR = 'BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return { ...state, value: action.value, isValid: action.isValid };
    case BLUR:
      return { ...state, touched: true };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.isValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const inputChangeHandler = (text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatch({ type: CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={inputChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  error: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});
