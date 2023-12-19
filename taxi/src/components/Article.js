import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
export const Article = () => {
  const destination = useSelector(state => state.Location.destinationLatLng);
  console.log('heelo');
  return (
    <View>
      <Text style={{color: 'black'}}>Article</Text>
    </View>
  );
};
