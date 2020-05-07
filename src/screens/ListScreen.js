import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
} from 'react-native';

import API_URL from '../config';

export default class ListScreen extends React.Component {
  state = {
    items: [],
    loading: true,
    error: null,
  };

  fetchData = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((json) => {
        // this.setState();
      })
      .catch((error) => {
        this.setState({ error: 'Someting went wrong when fetching beer list' });
      });
  };

  renderList = () => {
    <FlatList
      data={this.state.items}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
        />
      )}
      keyExtractor={(item) => item.id}
      extraData={selected}
    />;
  };

  render = () => {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          this.renderList()
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
