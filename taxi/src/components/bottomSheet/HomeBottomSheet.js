import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useRef, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetScroller from './bottomSheetScroller';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import PickupBottomSheet, {originSheet} from './PickupBottomSheet';
import DestinationBottomSheet, {
  destinationSheet,
} from './DestinationBottomSheet';
import {useSelector} from 'react-redux';
export var bottomSheetRef = null;
import InputMarker from 'react-native-vector-icons/FontAwesome6';
const HomeBottomSheet = ({navigation, rideRequest}) => {
  bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const timeTaken = useSelector(state => state.Location.time);
  const originName = useSelector(state => state.Location.originName);
  const destinationName = useSelector(state => state.Location.destinationName);
  const routeDistance = useSelector(state => state.Location.routeDistance);

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enableOverDrag={false}
        style={{
          paddingLeft: responsiveWidth(3),
          paddingRight: responsiveWidth(3),
          paddingBottom: responsiveHeight(3),
        }}
        snapPoints={snapPoints}>
        <BottomSheetScroller />

        <TouchableOpacity
          onPress={() => originSheet.current?.snapToIndex(0)}
          style={{
            borderBottomColor: '#D8D8D8',
            width: responsiveWidth(100),
            height: responsiveHeight(3),
            borderBottomWidth: 1,
            marginBottom: responsiveHeight(5),
            marginTop: responsiveHeight(-5),
          }}>
          {originName ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <InputMarker name="circle-dot" color="blue" size={20} />

              <Text style={{color: 'black'}}>{originName}</Text>
            </View>
          ) : (
            <Text style={{color: 'black'}}>Enter Origin Name</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => destinationSheet.current?.snapToIndex(0)}
          style={{
            borderBottomColor: '#D8D8D8',
            width: responsiveWidth(100),
            height: responsiveHeight(3),
            borderBottomWidth: 1,
            marginLeft: responsiveWidth(0),
          }}>
          {destinationName ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <InputMarker name="circle-dot" color="grey" size={20} />
              <Text style={{color: 'black'}}>{destinationName}</Text>
            </View>
          ) : (
            <Text style={{color: 'black'}}>Enter Destination Name</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#f5f5dc',
            marginTop: responsiveHeight(4),
            padding: responsiveHeight(1),
            borderRadius: responsiveHeight(1),
          }}>
          <Text style={{color: 'black', alignSelf: 'center'}}>
            Travel Time ~{timeTaken && timeTaken.toFixed(1)} min
          </Text>
        </View>
        <TouchableOpacity
          onPress={rideRequest}
          style={{
            backgroundColor: '#7fff00',
            height: responsiveHeight(7),
            justifyContent: 'center',
            marginTop: responsiveHeight(1),
            borderRadius: responsiveHeight(2),
          }}>
          <Text
            style={{
              textAlign: 'center',
            }}>
            Find a Driver
          </Text>
        </TouchableOpacity>
      </BottomSheet>
      <DestinationBottomSheet navigation={navigation} />
      <PickupBottomSheet navigation={navigation} />
    </>
  );
};

export default HomeBottomSheet;
