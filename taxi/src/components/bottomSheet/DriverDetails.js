import {View, Text} from 'react-native';
import React, {useRef, useMemo} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Person from 'react-native-vector-icons/Ionicons';

export var driverDetailSheet;

const DriverDetails = ({driverData}) => {
  driverDetailSheet = useRef();
  const driverDetailSheetSnapPoints = useMemo(() => ['30%', '10%'], []);
  return (
    <BottomSheet
      ref={driverDetailSheet}
      snapPoints={driverDetailSheetSnapPoints}
      index={0}
      style={{
        borderRadius: responsiveHeight(5),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View>
          <Text>Red Car Honda City</Text>
          <Text
            style={{
              textAlign: 'center',
              padding: 5,
              borderColor: 'grey',
              borderWidth: responsiveWidth(0.1),
              width: responsiveWidth(20),
              marginTop: responsiveHeight(2),
              marginLeft: responsiveWidth(7),
              borderRadius: responsiveWidth(1.5),
            }}>
            {driverData.carNo}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#BABABB',
          height: responsiveHeight(15),
          marginTop: responsiveHeight(2),
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Person name="person-circle" color="blue" size={60} />
        <Text style={{color: 'black'}}>{driverData.firstName}</Text>
      </View>
    </BottomSheet>
  );
};

export default DriverDetails;
