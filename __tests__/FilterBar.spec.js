import React from 'react';
import { create } from 'react-test-renderer';
import { Button } from 'react-native-elements';

import FilterBar from '../src/components/FilterBar';

describe('FilterBar component', () => {
  test('Matches the snapshot', () => {
    const filterBar = create(<FilterBar />);
    expect(filterBar.toJSON()).toMatchSnapshot();
  });

  test('it renders filters and clear button as children', () => {
    const component = create(
      <FilterBar clearFilters={this.clearFilters}>
        <Button title='Filter number one' />
        <Button title='Filter number two' />
        <Button title='Filter number two' />
        <Button title='Filter number two' />
      </FilterBar>
    );

    const instance = component.root;
    const buttons = instance.findAllByType(Button);

    expect(buttons).toHaveLength(5);
  });
});
