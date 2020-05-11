import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { GREEN_COLOR } from '../helpers';
import DetailsModal from '../components/DetailsModal';

/**
 * Component responsible for displaying one beer on list
 *
 * Displays different data parts depending on use clickable prop
 *
 * item:      beer details
 * related:   display tile as related item (with different properties)
 *
 * @param {
 *      item:    object,
 *      related: bool
 * } props
 */
let BeerTile = (props) => {
  let { item, related } = props;

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={toggleModalVisible}>
      <View style={styles.container}>
        <Image
          source={{ uri: item.image_url }}
          resizeMode='contain'
          style={styles.image}
        />
        <View style={{ flexShrink: 1 }}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>{item.name}</Text>

          {!related && <Text style={styles.text}>{item.description}</Text>}

          {!related && (
            <Text style={[styles.text, { color: GREEN_COLOR }]}>
              {`First brewed: ${item.first_brewed}`}
            </Text>
          )}

          {!related && item.ingredients && (
            <Text style={styles.textItalic}>
              {`Yeast: ${item.ingredients.yeast}`}
            </Text>
          )}

          {related && <Text style={styles.text}>{`ABV: ${item.abv}`}</Text>}
          {related && <Text style={styles.text}>{`IBU: ${item.ibu}`}</Text>}
          {related && <Text style={styles.text}>{`EBC: ${item.ebc}`}</Text>}
        </View>

        {modalVisible && <DetailsModal item={item} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const textStyle = {
  fontSize: 14,
  alignItems: 'center',
  color: BASE_COLOR,
};

const styles = StyleSheet.create({
  text: textStyle,
  textItalic: {
    ...textStyle,
    fontStyle: 'italic',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
});

BeerTile.propTypes = {
  item: PropTypes.object.isRequired,
  related: PropTypes.bool,
};

export default BeerTile;
