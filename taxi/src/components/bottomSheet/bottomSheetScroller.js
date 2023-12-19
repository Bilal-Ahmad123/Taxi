import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {ScrollView} from 'react-native-gesture-handler';

const images = [
  {uri: require('../../assets/transportIcons/1.png'), title: 'Ac'},
  {uri: require('../../assets/transportIcons/2.png'), title: 'Ride'},
  {uri: require('../../assets/transportIcons/3.png'), title: 'Ride Mini'},
  {uri: require('../../assets/transportIcons/4.png'), title: 'Bike'},
  {uri: require('../../assets/transportIcons/5.png'), title: 'City to city'},
  {uri: require('../../assets/transportIcons/6.png'), title: 'Courier'},
  {
    uri: require('../../assets/transportIcons/7.png'),
    title: 'Truck: city to city',
  },
  {uri: require('../../assets/transportIcons/8.png'), title: 'Freight'},
];

export default function BottomSheetScroller() {
  return (
    <View style={{height: responsiveHeight(15)}}>
      <ScrollView
        horizontal
        style={{
          height: responsiveHeight(3),
        }}>
        {images.map((img, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                height: responsiveHeight(3),
              }}>
              <Image
                resizeMode="contain"
                source={img.uri}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(3.5),
                  marginRight: responsiveWidth(5),
                }}
              />
              <Text style={{color: 'black'}}>{img.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
