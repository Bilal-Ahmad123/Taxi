import {createDrawerNavigator} from '@react-navigation/drawer';
import {Article} from '../components/Article';
import React, {Fragment, useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ShowRiderDriverLocation} from '../screens/rider/showRiderDriverLocation';
import {io} from 'socket.io-client';
import {mySocket} from '../customHooks/getLocation/Socket';
import DestinationScreen from '../screens/rider/destinationScreen';
import OriginScreen from '../screens/rider/originScreen';
import LoginScreen from '../screens/Auth/Login';
import auth from '@react-native-firebase/auth';
import RegistrationScreen from '../screens/Auth/RegisterRider';
import CustomLogoutDrawer from '../screens/Auth/LogoutScreen';
import {useDispatch, useSelector} from 'react-redux';
import {UserActions} from '../Redux/slices/UserSlice';
import RegisterDriver from '../screens/Auth/RegisterDriver';
export var drawerNavigationRef;
import firestore from '@react-native-firebase/firestore';
import DriverHomeScreen from '../screens/driver/DriverHomeScreen';
import AllRideRequests from '../screens/driver/AllRideRequests';
import RouteMonitor from '../screens/rider/routeMonitor';
import RouteOverview from '../screens/driver/RouteOverview';
import {createNavigationContainerRef} from '@react-navigation/native';
const socketOptions = {autoConnect: false};
export const socket = io.connect('http://192.168.18.16:5000', socketOptions);
socket.autoConnect = false;

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

export default function MyDrawer({navigation}) {
  const dispatch = useDispatch();
  useEffect(() => {
    const loginUser = async () => {
      if (auth().currentUser) {
        dispatch(UserActions.loginUser(true));
        try {
          const user = await firestore()
            .collection('Users')
            .doc(auth().currentUser.uid)
            .get();

          dispatch(UserActions.setUserId(auth().currentUser.uid));
          dispatch(UserActions.setUser(user));
          socket.connect();
        } catch (err) {
          console.log(err);
        }
      }
    };
    loginUser();
  }, []);

  const isUserLoggedIn = useSelector(state => state.User.isUserLoggedIn);
  const user = useSelector(state => state.User.user);

  return (
    <mySocket.Provider value={socket}>
      <Drawer.Navigator
        initialRouteName="Rider"
        drawerContent={props => <CustomLogoutDrawer {...props} />}
        screenOptions={{
          drawerLabelStyle: {
            fontSize: 20,
            color: 'black',
            fontWeight: '400',
          },
        }}>
        {isUserLoggedIn && (
          <>
            {user?._data.role == 'driver' ? (
              <Fragment>
                <Drawer.Screen
                  name="driverHomeScreen"
                  component={DriverHomeScreen}
                  options={{headerShown: false}}
                />
                <Drawer.Screen
                  name="allRideRequests"
                  component={AllRideRequests}
                  options={{headerShown: false}}
                />
                <Drawer.Screen
                  name="routeOverView"
                  component={RouteOverview}
                  options={{headerShown: false}}
                />
              </Fragment>
            ) : (
              <>
                <Drawer.Screen
                  name="Rider"
                  component={ShowRiderDriverLocation}
                  options={{headerShown: false}}
                />

                <Drawer.Screen
                  name="routeMonitor"
                  component={RouteMonitor}
                  options={{headerShown: false}}
                />
                <Drawer.Screen
                  name="originscreen"
                  component={OriginScreen}
                  options={{headerShown: false, drawerItemStyle: {height: 0}}}
                />
                <Drawer.Screen
                  name="destinationscreen"
                  component={DestinationScreen}
                  options={{headerShown: false, drawerItemStyle: {height: 0}}}
                />
              </>
            )}

            <Drawer.Screen
              name="Support"
              component={Article}
              options={{headerShown: false}}
            />
          </>
        )}

        {!isUserLoggedIn && (
          <Drawer.Screen
            name="auth"
            component={AuthStack}
            options={{headerShown: false}}
          />
        )}
      </Drawer.Navigator>
    </mySocket.Provider>
  );
}

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerRider"
        component={RegistrationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="registerDriver"
        component={RegisterDriver}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
