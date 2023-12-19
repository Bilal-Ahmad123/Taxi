import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {socket} from '../../navigation/Drawer';

const AllRideRequests = () => {
  useEffect(() => {
    socket.on('getRideRequest', data => {
      console.log(data);
    });

    return () => socket.off('getRideRequest');
  }, []);
  return (
    <View>
      <Text>AllRideRequests</Text>
    </View>
  );
};

export default AllRideRequests;
