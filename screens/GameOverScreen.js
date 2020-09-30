import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const GameOverScreen = (props) => {
  const [availableWidth, setAvailableWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableHeight, setAvailableHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableWidth(Dimensions.get('window').width);
      setAvailableHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => Dimensions.removeEventListener('change', updateLayout);
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over</TitleText>
        <View
          style={{
            ...styles.imageContainer,
            width: availableWidth * 0.7,
            height: availableWidth * 0.7,
            borderRadius: (availableWidth * 0.7) / 2,
            marginVertical: availableHeight / 30,
          }}
        >
          <Image
            source={require('../assets/success.png')}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.resultContainer,
            marginVertical: availableHeight / 60,
          }}
        >
          <BodyText
            style={{
              ...styles.resultText,
              fontSize: availableHeight < 400 ? 16 : 20,
            }}
          >
            Your phone needed{' '}
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{' '}
            <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
  },
  resultContainer: {
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
  },
});
