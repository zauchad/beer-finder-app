import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR from '../helpers';
import API_URL from '../config';
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
    typeLowerCase = type.toLowerCase(),
    approx = 3;

  const [items, setItems] = useState([]);

  let url = `${API_URL}?${typeLowerCase}_lt=${
    typeValue + approx
  }&${typeLowerCase}_gt=${typeValue - approx}&per_page=5`;

  useEffect(() => {
    if (!items.length) {
      fetch(url)
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
            return <BeerTile item={i} key={i.id.toString()} />;
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