import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';

import BASE_COLOR, { GREEN_COLOR } from '../helpers';

/**
 * Responsible for displaying button which open native DatePicker
 *
 * Displays different basic item properties with related beers basing on similar ABV/IBU/EBC
 *
 * name:      property in API filtered by
 * onChange:  handler to invoke parent logic on event
 * date:      date in format MM-YYYY (format required for API usage) modified inside component
 *
 * @param {
 *      name:      string,
 *      onChange:  function,
 *      date:      string,
 * } props
 */
let FilterableDate = (props) => {
  let { name, onChange, date } = props,
    formattedDate = new Date();
  const title = name.replace('_', ' ');

  if (date) {
    //rearrange to format understandable by component (YYYY-MM)
    formattedDate = new Date(date.split('-')[1], date.split('-')[0]);
  }

  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };

  // handler to fire before passing to parent
  const afterOnChange = (event, selectedDate) => {
    //do nothing when user reject change
    if (event && event.type == 'dismissed') {
      return;
    }

    let currentDate = selectedDate || new Date();

    //rearrange to format understandable by API (MM-YYYY)
    currentDate = `${currentDate.getMonth()}-${currentDate.getFullYear()}`;
    setShow(Platform.OS === 'ios');

    onChange(name, currentDate);
  };

  return (
    <View>
      <Button
        title={title}
        buttonStyle={{
          marginRight: 5,
          backgroundColor: date ? GREEN_COLOR : BASE_COLOR,
        }}
        onPress={toggleShow}
      />
      {show && (
        <DateTimePicker
          timeZoneOffsetInMinutes={0}
          onChange={afterOnChange}
          value={formattedDate}
        />
      )}
    </View>
  );
};

FilterableDate.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  date: PropTypes.string,
};

export default FilterableDate;
