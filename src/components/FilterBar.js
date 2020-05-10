import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { WHITE_COLOR } from '../helpers';

export default FilterBar = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {props.children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: WHITE_COLOR,
    borderBottomColor: BASE_COLOR,
    borderBottomWidth: 0.5,
  },
  scrollViewContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

FilterBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
