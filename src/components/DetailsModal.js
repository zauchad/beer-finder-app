import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR, { GREEN_COLOR, GREY_COLOR } from '../helpers';

let DetailsModal = (props) => {
  let { item } = props;

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              padding: 15,
              alignItems: 'center',
              height: '100%',
            }}
          >
            <Image
              source={{ uri: item.image_url }}
              resizeMode='contain'
              style={{
                height: 150,
                width: 150,
                marginBottom: 10,
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
                  color: BASE_COLOR,
                }}
              >
                {`Brewers tips: ${item.brewers_tips}`}
              </Text>

              {
                <Text
                  style={{
                    fontSize: 14,
                    alignItems: 'center',
                    color: BASE_COLOR,
                    fontStyle: 'italic',
                  }}
                >
                  {`ABV: ${item.abv}`}
                </Text>
              }

              {
                <Text
                  style={{
                    fontSize: 14,
                    alignItems: 'center',
                    color: BASE_COLOR,
                    fontStyle: 'italic',
                  }}
                >
                  {`IBU: ${item.ibu}`}
                </Text>
              }

              {
                <Text
                  style={{
                    fontSize: 14,
                    alignItems: 'center',
                    color: BASE_COLOR,
                    fontStyle: 'italic',
                  }}
                >
                  {`EBC: ${item.ebc}`}
                </Text>
              }
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default DetailsModal;
