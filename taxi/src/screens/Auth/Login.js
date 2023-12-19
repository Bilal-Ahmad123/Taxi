import React, {useRef, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {UserActions} from '../../Redux/slices/UserSlice';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';
import {Toast} from 'react-native-toast-notifications';
import {socket} from '../../navigation/Drawer';
import notifee, {
  AndroidCategory,
  AndroidImportance,
} from '@notifee/react-native';
const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must contain at least 8 characters'),
});

const LoginScreen = ({navigation}) => {
  const animationRef = useRef(null);
  const isLoading = useSelector(state => state.User.isLoading);
  const dispatch = useDispatch();
  const handleSignup = async formData => {
    auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        dispatch(UserActions.setLoader(true));
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .get()
          .then(res => {
            socket.io.opts.query = {
              uid: user.user.uid,
              userRole: res._data.role,
            };

            socket.connect();
            dispatch(UserActions.setUser(res));
            dispatch(UserActions.loginUser());
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        Toast.show('The supplied auth credential are incorrect', {
          type: 'danger',
          placement: 'top',
          animationType: 'slide-in | zoom-in',
        });
      });
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      {isLoading && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <LottieView
            style={{width: 100, height: 100}}
            source={require('../../animations/LoadingAnimation.json')}
            autoPlay
            loop
            ref={animationRef}
          />
        </View>
      )}
      {!isLoading && (
        <View style={styles.container}>
          <Text style={styles.title}>Sign In</Text>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="grey"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{color: 'red'}}>{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                placeholderTextColor="grey"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{color: 'red'}}>{errors.password.message}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleSubmit(handleSignup)}>
              <Text style={styles.buttonText}>Log In </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('registerRider')}>
              <Text style={styles.buttonText}>Register As Rider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate('registerDriver')}>
              <Text style={styles.buttonText}>Register As Driver</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    height: responsiveHeight(4.6),
  },
  registerButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginTop: responsiveHeight(2),
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: responsiveWidth(50),
    marginTop: responsiveHeight(2),
  },
});

export default LoginScreen;
