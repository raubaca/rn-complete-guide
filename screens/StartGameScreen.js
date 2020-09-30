import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const StartGameScreen = (props) => {
  const [number, setNumber] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  const numberInputHandler = (inputText) => {
    setNumber(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setNumber('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(number);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setNumber('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
          <TitleText style={styles.title}>Start a New Game!</TitleText>
          <Card style={styles.inputContainer}>
            <BodyText>Select a Number</BodyText>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              value={number}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonContainer}>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Reset"
                  onPress={resetInputHandler}
                  color={Colors.accent}
                />
              </View>
              <View style={{ width: buttonWidth }}>
                <Button
                  title="Confirm"
                  onPress={confirmInputHandler}
                  color={Colors.primary}
                />
              </View>
            </View>
          </Card>
          {confirmedOutput}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});
