import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as React from 'react';
const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      styles={{
        textInputContainer: {
          backgroundColor: 'black',
          borderWidth: 0,
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
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDeBrkSyDJ3rqjxYxfGTfGXbis5KdGZ9Ks',
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
