import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';

import ListScreen from './screens';

export default function App() {
  return (
    <SafeAreaView style={[styles.container, styles.androidSafeArea]}>
      <ListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
