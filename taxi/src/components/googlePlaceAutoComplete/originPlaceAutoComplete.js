import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import * as React from 'react';

const GooglePlacesInput = () => {
  const apiKey = process.env.GOOGLE_MAP_API;

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
        key: apiKey,
        language: 'en',
      }}
    />
  );
};

export default GooglePlacesInput;
