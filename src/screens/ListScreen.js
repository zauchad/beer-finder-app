import React from 'react';
import {
  ActivityIndicator,
  View,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { SearchBar } from 'react-native-elements';

import API_URL from '../config';
import BASE_COLOR, { GREY_COLOR, WHITE_COLOR } from '../helpers';
import FilterBar from '../components/FilterBar';
import FilterableDate from '../components/FilterableDate';
import BeerTile from '../components/BeerTile';

/**
 * Beer list screen
 *
 * Displays searchbar to filter beers by yeast attribute
 * Displays filter bar to filter by brewed_before and brewed_after attributes
 * FlatList displaying 25 items per page (default API returned items length)
 *
 */
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

    return url;
  };

  /**
   * Perform fetching data from API
   */
  fetchData = (refreshing = false) => {
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
            Alert.alert('Someting went wrong when fetching beer list');

            this.setState({
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
    let { listScrolled, items, loading, refreshing } = this.state;

    if (!listScrolled || items.length % 25 != 0) {
      return null;
    }

    if (!loading && !refreshing) {
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
          height: 1,
          width: '100%',
          backgroundColor: GREY_COLOR,
        }}
      />
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.fetchData(true);
  };

  updateSearch = (text, reset) => {
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
    let filters = this.state.filters;
    filters[queryParam] = value;

    this.setState(
      {
        filters,
      },
      this.onRefresh
    );
  };

  clearFilters = () => {
    this.setState({ filters: {} }, this.onRefresh);
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
          containerStyle={{ width: '100%' }}
        />
        <FilterBar clearFilters={this.clearFilters}>
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
          renderItem={({ item }) => <BeerTile item={item} />}
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
    if (this.state.loading && this.page === 1) {
      return <ActivityIndicator size='large' color={BASE_COLOR} />;
    } else {
      return this.renderList();
    }
  };
}
