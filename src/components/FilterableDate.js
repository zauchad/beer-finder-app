import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Platform } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';

import BASE_COLOR, { GREEN_COLOR } from '../helpers';

let FilterableDate = (props) => {
  let { name, onChange, date } = props,
    formattedDate = null;
  const title = name.replace('_', ' ');

  if (date) {
    console.log('dateeee', date);
    formattedDate = `${date.split('-')[1]}-${date.split('-')[0]}`;
  }

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(formattedDate));

  const toggleShow = () => {
    setShow(!show);
  };

  const afterOnChange = (event, selectedDate) => {
    let currentDate = selectedDate || new Date();

    currentDate = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    setShow(Platform.OS === 'ios');
    setSelectedDate(currentDate);

    onChange(name, currentDate);
  };

  console.log('datepicker selectedDate', selectedDate);
  console.log('datepicker formatteddate', formattedDate);
  console.log('new dtae', new Date());
  console.log('new dtae', new Date(''));
  return (
    <View>
      <Button
        title={title}
        buttonStyle={{
          marginRight: 5,
          //   backgroundColor: date ? GREEN_COLOR : BASE_COLOR,
        }}
        onPress={toggleShow}
      />
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          timeZoneOffsetInMinutes={0}
          value={new Date()}
          display='default'
          onChange={afterOnChange}
          value={new Date('2019-10')}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

FilterableDate.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FilterableDate;
