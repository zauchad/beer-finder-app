import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

import ListScreen from './screens';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
});
