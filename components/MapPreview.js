import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ENV from '../env';

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${ENV.hereApiKey}&lat=${props.location.lat}&lon=${props.location.lng}&vt=0&z=14`;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});
