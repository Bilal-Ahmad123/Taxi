import {View, Text, Keyboard, TouchableOpacity} from 'react-native';
import React, {useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import MapMarker from 'react-native-vector-icons/FontAwesome5';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {getDestinationName} from '../../Redux/actions/locationActions';
import {useDispatch} from 'react-redux';
export var destinationSheet = null;
const DestinationBottomSheet = ({navigation}) => {
  const originAndDestinationSnapPoints = useMemo(() => ['97%'], []);
  destinationSheet = useRef(null);
  const dispatch = useDispatch();

  return (
    <BottomSheet
      ref={destinationSheet}
      index={-1}
      style={{borderRadius: 40, paddingHorizontal: responsiveWidth(5)}}
      onChange={() => {
        Keyboard.dismiss();
      }}
      enablePanDownToClose
      snapPoints={originAndDestinationSnapPoints}>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
        <MapMarker color="#318CE7" name="map-marker-alt" size={20} />
        <Text
          onPress={() => {
            destinationSheet.current?.forceClose();
            navigation.navigate('destinationscreen');
          }}
          style={{
            color: '#318CE7',
            fontSize: responsiveFontSize(2.5),
            marginLeft: responsiveWidth(3),
          }}>
          Choose On Map
        </Text>
      </TouchableOpacity>

      <GooglePlacesAutocomplete
        placeholder="Destination"
        textInputProps={{
          placeholderTextColor: '#32a852',
        }}
        styles={{
          textInputContainer: {
            borderWidth: 0.5,
            marginTop: responsiveHeight(5),
          },
          description: {color: 'black'},

          textInput: {
            height: 38,
            color: 'black',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: 'black',
          },
        }}
        fetchDetails={true} // you need this to fetch the details object onPress
        onPress={(data, details = null) => {
          dispatch(
            getDestinationName({
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            }),
          );
          destinationSheet.current.close();
        }}
        query={{
          key: 'AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks',
          language: 'en',
        }}
      />
    </BottomSheet>
  );
};

export default DestinationBottomSheet;
