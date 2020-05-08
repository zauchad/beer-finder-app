import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';

import API_URL from '../config';
import BASE_COLOR from '../helpers';
export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: false,
      refreshing: false,
      error: '',
    };

    this.page = 1;
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = (refreshing = false) => {
    this.setState(
      {
        ...(!refreshing && { loading: true }),
        ...(refreshing && { refreshing: true }),
      },
      () => {
        fetch(`${API_URL}?page=${this.page}`)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState(
              {
                items: [...this.state.items, ...responseJson],
                ...(!refreshing && { loading: false }),
                ...(refreshing && { refreshing: false }),
              },
              () => {
                console.log(this.state);
              }
            );
          })
          .catch((error) => {
            this.setState({
              error: 'Someting went wrong when fetching beer list',
              ...(!refreshing && { loading: false }),
              ...(refreshing && { refreshing: false }),
            });
          });

        console.log(this.state);
      }
    );
  };

  handleLoadMore = () => {
    console.log('handleloadmore');
    // if (!this.state.loading && !this.state.refreshing) {
    //   this.page += 1;
    //   this.fetchData();
    // }
  };

  renderFooter = () => {
    if (!this.state.loading) return null;
    return <ActivityIndicator color={BASE_COLOR} />;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  onRefresh() {
    this.fetchData(true);
  }

  renderList = () => {
    return (
      <FlatList
        data={this.state.items}
        extraData={this.state}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        renderItem={({ item }) => (
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
            <Text
              style={{
                fontSize: 18,
                alignItems: 'center',
                color: BASE_COLOR,
              }}
            >
              {item.name}
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.9}
        onEndReached={this.handleLoadMore}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  };

  render = () => {
    return (
      <View style={styles.container}>
        {this.state.loading && this.page === 1 ? (
          <ActivityIndicator size='large' color={BASE_COLOR} />
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
    width: '100%',
    height: '100%',
  },
});
