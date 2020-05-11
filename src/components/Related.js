import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { urlForRelated } from '../helpers';
import BeerTile from './BeerTile';

/**
 * Responsible for displaying related items in horizontal ScrollView
 *
 * Using approx variable to apply acceptable filtered attribute value difference
 *
 * type:      attribute for filtering beer in API
 * typeValue:  attribute value
 *
 * @param {
 *      type:      string,
 *      typeValue: number,
 * } props
 */
export default Related = (props) => {
  let { type, typeValue } = props,
    approx = 3;

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!items.length) {
      fetch(urlForRelated(type, typeValue, approx))
        .then((response) => response.json())
        .then((responseJson) => {
          setItems(responseJson);
        })
        .catch((error) => {
          Alert.alert('Someting went wrong when fetching related beer list');
        });
    }
  });

  return (
    <React.Fragment>
      <Text style={styles.textItalic}>Related ({type})</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContent}
        showsHorizontalScrollIndicator={false}
      >
        {items &&
          items.map((i) => {
            return <BeerTile item={i} key={i.id.toString()} related />;
          })}
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
  },
  textItalic: {
    fontSize: 16,
    textAlign: 'center',
    color: BASE_COLOR,
    fontStyle: 'italic',
  },
});

Related.propTypes = {
  type: PropTypes.string.isRequired,
  typeValue: PropTypes.number.isRequired,
};
