import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Colors from '../constants/colors';
import TitleText from './TitleText';

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.header,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <TitleText style={styles.title}>{props.title}</TitleText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    color: 'white',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  title: {
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});
