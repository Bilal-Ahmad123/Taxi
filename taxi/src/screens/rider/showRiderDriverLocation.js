import React, {useState, useRef, useContext, useEffect, Fragment} from 'react';
import {StyleSheet, View} from 'react-native';
import DrawerMenuButton from '../../components/buttons/drawerMenuButton';
import {Host, Portal} from 'react-native-portalize';
import HomeBottomSheet from '../../components/bottomSheet/HomeBottomSheet';
import HomeMape from '../../components/Maps/HomeMape';
import NavigateButton from '../../components/buttons/NavigateButton';
import {useSelector} from 'react-redux';

export const ShowRiderDriverLocation = ({navigation}) => {
  const originLatLng = useSelector(state => state.Location.originLatLng);
  const destinationLatLng = useSelector(
    state => state.Location.destinationLatLng,
  );

  return (
    <Host>
      <View style={styles.container}>
        <DrawerMenuButton navigation={navigation} />
        <HomeMape navigation={navigation} />
      </View>
    </Host>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
