import {View, Text, ScrollView, Keyboard} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MapMarker from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';
import {getOriginName} from '../../Redux/actions/locationActions';
import {useDispatch} from 'react-redux';
export var originSheet = null;
const PickupBottomSheet = ({navigation}) => {
  const originAndDestinationSnapPoints = useMemo(() => ['97%'], []);
  originSheet = useRef(null);
  const dispatch = useDispatch();

  return (
    <BottomSheet
      ref={originSheet}
      onChange={() => {
        Keyboard.dismiss();
      }}
      index={-1}
      style={{borderRadius: 40, paddingHorizontal: responsiveWidth(5)}}
      enablePanDownToClose
      snapPoints={originAndDestinationSnapPoints}>
      <TouchableOpacity style={{display: 'flex', flexDirection: 'row'}}>
        <MapMarker color="#318CE7" name="map-marker-alt" size={20} />
        <Text
          onPress={() => {
            originSheet.current?.forceClose();
            navigation.navigate('originscreen');
          }}
          style={{
            color: '#318CE7',
            marginLeft: responsiveWidth(3),
            fontSize: responsiveFontSize(2.5),
          }}>
          Choose On Map
        </Text>
      </TouchableOpacity>
      <GooglePlacesAutocomplete
        placeholder="Pickup Location"
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
            getOriginName({
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            }),
          );
          originSheet.current.close();
        }}
        query={{
          key: 'AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks',
          language: 'en',
        }}
      />
    </BottomSheet>
  );
};

export default PickupBottomSheet;
