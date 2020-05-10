import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';

import BASE_COLOR, { WHITE_COLOR, GREY_COLOR } from '../helpers';

export default FilterBar = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ flexDirection: 'row' }}>{props.children}</View>
        <Button
          title='Clear'
          onPress={props.clearFilters}
          buttonStyle={{
            alignSelf: 'flex-start',
            justifyContent: 'flex-end',
            backgroundColor: GREY_COLOR,
          }}
        ></Button>
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

FilterBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  clearFilters: PropTypes.func,
};
