import {View, Text, TouchableOpacity} from 'react-native';
import React, {useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import auth from '@react-native-firebase/auth';
import {Portal} from 'react-native-portalize';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Person from 'react-native-vector-icons/Ionicons';
import {socket} from '../../navigation/Drawer';
import {navigationRef} from '../../../App';
import {useModal} from 'react-native-modalfy';
export var timeBottomSheetRef;
const TimeBottomSheet = ({
  origin,
  destination,
  name,
  riderUid,
  riderOriginLatLng,
  riderDestinationLatLng,
}) => {
  const timeBottomSheetSnapPoints = useMemo(() => ['60%'], []);
  timeBottomSheetRef = useRef();
  const {closeModal} = useModal();

  const AcceptRide = time => {
    socket.emit('acceptRide', {
      time,
      riderUid,
      driverUid: auth().currentUser.uid,
    });

    closeModal('RideRequest');
    timeBottomSheetRef?.current?.close();

    navigationRef.navigate('routeOverView', {
      time,
      riderOriginLatLng: JSON.stringify(riderOriginLatLng),
      riderDestinationLatLng: JSON.stringify(riderDestinationLatLng),
      riderUid,
      origin,
      destination,
    });
  };
  return (
    <BottomSheet
      ref={timeBottomSheetRef}
      snapPoints={timeBottomSheetSnapPoints}
      index={-1}
      handleStyle={{paddingTop: responsiveHeight(-1)}}
      handleIndicatorStyle={{
        marginBottom: responsiveHeight(-5),
        display: 'none',
      }}
      style={{
        borderRadius: responsiveHeight(5),
      }}>
      <BottomSheetView
        style={{
          backgroundColor: '#E7E6E8',
          height: responsiveHeight(15),
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Person name="person-circle" color="blue" size={60} />
            <Text style={{color: 'black', fontSize: responsiveFontSize(2.2)}}>
              {name}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                flexShrink: 1,
                marginRight: responsiveWidth(10),
                fontSize: responsiveFontSize(2.2),
              }}>
              {origin}
            </Text>
          </View>
        </View>
      </BottomSheetView>
      <View
        style={{
          marginTop: responsiveHeight(2),
          display: 'flex',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: responsiveFontSize(2.5),
            fontWeight: '700',
          }}>
          How Soon Will You Arrive?
        </Text>
        <TouchableOpacity
          onPress={() => AcceptRide(5)}
          style={{
            backgroundColor: '#8DB924',
            marginTop: 10,
            padding: 10,
            borderRadius: responsiveHeight(2),
            width: responsiveWidth(90),
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: responsiveFontSize(2.4),
            }}>
            5 min.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => AcceptRide(10)}
          style={{
            backgroundColor: '#8DB924',
            marginTop: 10,
            padding: 10,
            borderRadius: responsiveHeight(2),
            width: responsiveWidth(90),
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: responsiveFontSize(2.4),
            }}>
            10 min.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => AcceptRide(15)}
          style={{
            backgroundColor: '#8DB924',
            marginTop: 10,
            padding: 10,
            borderRadius: responsiveHeight(2),
            width: responsiveWidth(90),
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: responsiveFontSize(2.4),
            }}>
            15 min
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => AcceptRide(20)}
          style={{
            backgroundColor: '#8DB924',
            marginTop: 10,
            padding: 10,
            borderRadius: responsiveHeight(2),
            width: responsiveWidth(90),
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: responsiveFontSize(2.4),
            }}>
            20 min.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            timeBottomSheetRef.current?.close();
          }}
          style={{
            backgroundColor: '#8DB924',
            marginTop: 10,
            padding: 10,
            borderRadius: responsiveHeight(2),
            width: responsiveWidth(90),
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: responsiveFontSize(2.4),
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default TimeBottomSheet;
