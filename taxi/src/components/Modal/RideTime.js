import {View, Text, StyleSheet, Button, Modal} from 'react-native';
import React from 'react';

const RideTime = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      coverScreen={false}
      hasBackdrop={false}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Ride Arrival Time: 5 minutes</Text>
          <Button title="Close Modal" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default RideTime;
