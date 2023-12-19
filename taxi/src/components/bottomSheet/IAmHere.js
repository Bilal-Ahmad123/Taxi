import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useMemo, useEffect, useState} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Person from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';

export var hereSheet;

const IAmHere = ({riderUid, origin, setToggleRoute, toggleRoute}) => {
  hereSheet = useRef();
  const [riderName, setRiderName] = useState();
  const hereSnapPoints = useMemo(() => ['30%', '10%'], []);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const fetchRiderData = async () => {
      const data = await firestore().collection('Users').doc(riderUid).get();
      setRiderName(data?._data?.firstName);
    };
    fetchRiderData();
  }, []);

  return (
    <BottomSheet
      ref={hereSheet}
      snapPoints={hereSnapPoints}
      index={0}
      style={{
        borderRadius: responsiveHeight(5),
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: responsiveWidth(5),
        }}>
        <Person name="person-circle" color="blue" size={60} />
        <Text style={{color: 'black'}}>{origin}</Text>
      </View>
      {riderName && (
        <Text
          style={{
            color: 'black',
            marginLeft: responsiveWidth(7),
            marginTop: responsiveHeight(1),
          }}>
          {riderName}
        </Text>
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: responsiveHeight(4),
        }}>
        {!showButton && (
          <TouchableOpacity
            onPress={() => setShowButton(true)}
            style={{
              backgroundColor: '#618EBB',
              height: responsiveHeight(7),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveWidth(70),
              borderRadius: responsiveWidth(4),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '400',
                color: 'black',
                fontSize: responsiveFontSize(2.3),
              }}>
              I'm here
            </Text>
          </TouchableOpacity>
        )}
        {showButton && (
          <TouchableOpacity
            onPress={() => setToggleRoute(true)}
            style={{
              backgroundColor: '#66A307',
              height: responsiveHeight(7),
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: responsiveWidth(70),
              borderRadius: responsiveWidth(4),
            }}>
            {!toggleRoute ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: responsiveFontSize(2.3),
                }}>
                Start the ride
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '400',
                  color: 'black',
                  fontSize: responsiveFontSize(2.3),
                }}>
                Ride Started
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </BottomSheet>
  );
};

export default IAmHere;
