import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useModal} from 'react-native-modalfy';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import DriverToRiderRoute from '../mapviewDirections/DriverToRiderRoute';
import RiderToDestination from '../mapviewDirections/RiderToDestination';
import Sound from 'react-native-sound';
import {useSelector} from 'react-redux';
import A from 'react-native-vector-icons/FontAwesome6';
import B from 'react-native-vector-icons/MaterialCommunityIcons';
import Person from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import TimeBottomSheet, {
  timeBottomSheetRef,
} from '../bottomSheet/TimeBottomSheet';

Sound.setCategory('Playback');

const indriveSound = new Sound('in_driver.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});
const RideRequest = ({modal: {params}}) => {
  const originName = useSelector(state => state.Location.riderOriginName);
  const [riderName, setRiderName] = useState();
  const destinationName = useSelector(
    state => state.Location.riderDestinationName,
  );
  const {closeModal} = useModal();
  const {origin, destination, riderUid} = params;
  const [currentLocation, setCurrentLocation] = useState();
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      setCurrentLocation(position?.coords);
    });
    indriveSound.play();
  }, []);

  useEffect(() => {
    const fetchRider = async () => {
      const name = await firestore().collection('Users').doc(riderUid).get();
      setRiderName(name?._data?.firstName + ' ' + name?._data?.lastName);
    };
    fetchRider();
  }, []);

  const mapRef = useRef();

  // useEffect(() => {
  //   socket.emit('acceptRideRequest');

  const AcceptRide = async () => {
    const rider = await firestore().collection('Users').doc(riderUid);
    await firestore().collection('Rides').add({
      fare: 100,
      rider: rider,
    });
  };

  return (
    <>
      {currentLocation && (
        <View
          style={{
            alignSelf: 'center',
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            borderTopLeftRadius: responsiveHeight(2),
            borderTopRightRadius: responsiveHeight(2),
            overflow: 'hidden',
            marginTop: responsiveHeight(1),
          }}>
          <MapView
            style={{
              flex: 1,
            }}
            ref={mapRef}
            mapPadding={{
              top: responsiveHeight(40),
              right: 0,
              bottom: 0,
              left: 0,
            }}
            mapType="standard"
            onMapReady={() => {
              setTimeout(() => {
                mapRef.current?.fitToSuppliedMarkers(
                  ['riderDestination', 'myOrigin', 'riderOrigin'],
                  {
                    animated: true,

                    edgePadding: {
                      top: 100,
                      right: 100,
                      left: 100,
                      bottom: 100,
                    },
                  },
                );
              }, 50);
            }}
            zoomEnabled={true}
            tracksViewChanges={false}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <DriverToRiderRoute
              origin={currentLocation}
              destination={origin}
              color="black"
            />

            <RiderToDestination origin={origin} destination={destination} />
          </MapView>

          <View style={styles.modalContent}>
            <View
              style={{
                marginRight: responsiveWidth(7),
                marginTop: responsiveHeight(-1),
              }}>
              {/* Add other content as needed */}
              <View style={styles.buttonContainer}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Person name="person-circle" color="blue" size={60} />
                  <Text
                    style={{color: 'black'}}
                    numberOfLines={1}
                    ellipsizeMode="head">
                    {riderName && riderName}
                  </Text>
                </View>
                {destinationName && originName && (
                  <View style={{flexDirection: 'column'}}>
                    <View style={{display: 'flex', flexDirection: 'row'}}>
                      <A name="adn" size={20} color="blue" />
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'black'}}>{originName}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <B name="alpha-b-circle" size={25} color="brown" />
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: 'black', flexShrink: 1}}>
                          {destinationName}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
            <View style={{marginTop: responsiveHeight(2)}}>
              <TouchableOpacity
                onPress={() => {
                  indriveSound.stop();
                  // AcceptRide();
                  timeBottomSheetRef?.current?.snapToIndex(0);
                }}
                style={{
                  backgroundColor: '#8DB924',
                  marginTop: 10,
                  padding: 10,
                  borderRadius: 5,
                  width: responsiveWidth(90),
                }}>
                <Text style={{color: 'black', textAlign: 'center'}}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                  indriveSound.stop();
                }}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <TimeBottomSheet
        origin={originName}
        destination={destinationName}
        name={riderName}
        riderUid={riderUid}
        riderOriginLatLng={origin}
        riderDestinationLatLng={destination}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    height: responsiveHeight(40),
  },
  modalText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
    alignItems: 'center',
    textAlign: 'center',
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#A7A5A8',
    borderRadius: 5,
    width: responsiveWidth(90),
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RideRequest;
