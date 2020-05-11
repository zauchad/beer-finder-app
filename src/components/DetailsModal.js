import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import BASE_COLOR from '../helpers';
import Related from './Related';

/**
 * Component responsible for displaying beer details
 *
 * Displays different basic item properties with related beers basing on similar ABV/IBU/EBC
 *
 * item:      beer details
 *
 * @param {
 *      item:      object,
 * } props
 */
let DetailsModal = (props) => {
  let { item } = props;

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <Modal animationType='slide' transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <TouchableHighlight
              style={{ position: 'absolute', top: 15, right: 15 }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.text}>Back</Text>
            </TouchableHighlight>
            <View style={styles.container}>
              <Image
                source={{ uri: item.image_url }}
                resizeMode='contain'
                style={styles.image}
              />
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.description}</Text>

                <Text style={styles.text}>
                  {`Brewers tips: ${item.brewers_tips}`}
                </Text>

                {<Text style={styles.textItalic}>{`ABV: ${item.abv}`}</Text>}
                {<Text style={styles.textItalic}>{`IBU: ${item.ibu}`}</Text>}
                {<Text style={styles.textItalic}>{`EBC: ${item.ebc}`}</Text>}

                <Related type='abv' typeValue={item.abv} />
                <Related type='ibu' typeValue={item.ibu} />
                <Related type='ebc' typeValue={item.ebc} />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const textStyle = {
  fontSize: 14,
  alignItems: 'center',
  color: BASE_COLOR,
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
  text: textStyle,
  textItalic: {
    ...textStyle,
    fontStyle: 'italic',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  container: {
    padding: 15,
    alignItems: 'center',
    height: '100%',
  },
});

DetailsModal.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DetailsModal;
