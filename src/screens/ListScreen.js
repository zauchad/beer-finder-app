import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  SafeAreaView,
} from 'react-native';
import { SearchBar, Button } from 'react-native-elements';

import API_URL from '../config';
import BASE_COLOR, { GREEN_COLOR, GREY_COLOR, WHITE_COLOR } from '../helpers';
import FilterBar from '../components/FilterBar';
import FilterableDate from '../components/FilterableDate';
export default class ListScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      loading: false,
      refreshing: false,
      listScrolled: false,
      search: '',
      filters: {},
      error: '',
    };

    this.page = 1;
  }

  componentDidMount = () => {
    this.fetchData();
  };

  prepareUrl = () => {
    let { search, filters } = this.state,
      searchParam = '',
      filterParams = '';

    if (search) {
      searchParam = `&yeast=${search.replace(' ', '_').toLowerCase()}`;
    }

    if (Object.keys(filters).length) {
      Object.keys(filters).forEach((i) => {
        filterParams += `&${i}=${filters[i]}`;
      });
    }

    let url = `${API_URL}?page=${this.page}${searchParam}${filterParams}`;

    console.log('url', url);
    return url;
  };

  fetchData = (refreshing = false) => {
    console.log('fetch data');
    this.setState(
      {
        ...(!refreshing && { loading: true }),
        ...(refreshing && { refreshing: true }),
        listScrolled: false,
      },
      () => {
        fetch(this.prepareUrl())
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              ...(!refreshing && {
                loading: false,
                items: [...this.state.items, ...responseJson],
              }),
              ...(refreshing && { refreshing: false, items: responseJson }),
            });
          })
          .catch((error) => {
            this.setState({
              error: 'Someting went wrong when fetching beer list',
              ...(!refreshing && { loading: false }),
              ...(refreshing && { refreshing: false }),
            });
          });
      }
    );
  };

  resetSearch = () => {
    this.page = 1;
    this.updateSearch('', true);
  };

  handleLoadMore = () => {
    if (!this.state.listScrolled) {
      return null;
    }

    if (!this.state.loading && !this.state.refreshing) {
      this.page += 1;
      this.fetchData();
    }
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
          backgroundColor: GREY_COLOR,
        }}
      />
    );
  };

  onRefresh = () => {
    this.fetchData(true);
  };

  updateSearch = (text, reset) => {
    console.log('update search', text);

    this.setState({ search: text }, () => {
      if ((text.length && text.length >= 3) || reset) {
        this.fetchData(true);
      }
    });
  };

  /**
   * Solution for https://github.com/facebook/react-native/issues/12827 and
   * https://github.com/facebook/react-native/issues/16067 issues which causes
   * infinite invocation method binded to onEndReached flatList prop
   */
  onScroll = () => {
    this.setState({ listScrolled: true });
  };

  onFilterChange = (queryParam, value) => {
    console.log('queryParam value', queryParam, value);

    let filters = this.state.filters;
    filters[queryParam] = value;

    this.setState(
      {
        filters,
      },
      this.onRefresh
    );
  };

  renderList = () => {
    return (
      <React.Fragment>
        <SearchBar
          lightTheme={true}
          containerStyle={{ backgroundColor: WHITE_COLOR }}
          placeholder='Search by yeast name...'
          onChangeText={this.updateSearch}
          value={this.state.search}
          onClear={this.resetSearch}
        />
        <FilterBar>
          <FilterableDate
            name='brewed_before'
            onChange={this.onFilterChange}
            date={this.state.filters['brewed_before']}
          />
          <FilterableDate
            name='brewed_after'
            onChange={this.onFilterChange}
            date={this.state.filters['brewed_after']}
          />
        </FilterBar>
        <FlatList
          data={this.state.items}
          extraData={this.state}
          onScroll={this.onScroll}
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
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={this.handleLoadMore}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </React.Fragment>
    );
  };

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.loading && this.page === 1 ? (
          <ActivityIndicator size='large' color={BASE_COLOR} />
        ) : (
          this.renderList()
        )}
      </SafeAreaView>
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
