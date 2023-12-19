import {View, Text} from 'react-native';
import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {UserActions} from '../../Redux/slices/UserSlice';
import {socket} from '../../navigation/Drawer';
const CustomLogoutDrawer = props => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{fontSize: 20, color: 'black', fontWeight: '400'}}
        onPress={() => {
          auth().signOut();
          dispatch(UserActions.logoutUser(false));
          dispatch(UserActions.setUser(null));
          dispatch(UserActions.setUserId(null));
          socket.disconnect();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomLogoutDrawer;
