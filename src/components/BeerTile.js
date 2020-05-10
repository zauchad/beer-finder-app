import React, { useState } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { GREEN_COLOR } from '../helpers';
import DetailsModal from '../components/DetailsModal';

let BeerTile = (props) => {
  let { item } = props;

  const [modalVisible, setModalVisible] = useState(false);

  if (modalVisible) {
    return <DetailsModal item={item} />;
  }

  const toggleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableHighlight onPress={toggleModalVisible}>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          alignItems: 'center',
        }}
      >
        <Image
          source={{ uri: item.image_url }}
          resizeMode='contain'
          style={{
            height: 60,
            width: 60,
            marginRight: 10,
          }}
        />
        <View style={{ flexShrink: 1 }}>
          <Text
            style={{
              fontSize: 18,
              alignItems: 'center',
              color: BASE_COLOR,
            }}
          >
            {item.name}
          </Text>

          <Text
            style={{
              fontSize: 14,
              alignItems: 'center',
              color: BASE_COLOR,
            }}
          >
            {item.description}
          </Text>

          <Text
            style={{
              fontSize: 14,
              alignItems: 'center',
              color: GREEN_COLOR,
            }}
          >
            {`First brewed: ${item.first_brewed}`}
          </Text>

          {item.ingredients && (
            <Text
              style={{
                fontSize: 14,
                alignItems: 'center',
                color: BASE_COLOR,
                fontStyle: 'italic',
              }}
            >
              {`Yeast: ${item.ingredients.yeast}`}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

BeerTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default BeerTile;
