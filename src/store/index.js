
import { createStore } from 'vuex'
import config from '../config.json';

export default createStore({
  state: {
    products: '',
    sortMode: 'priceAsc',
    minPrice: 0,
    maxPrice: 50,
    minPopularity: 0,
    maxPopularity: 5,
    showFilters: false,
  },
  getters: {
    sortMode(state) {
      return state.sortMode;
    },
    maxPriceOfProducts(state) {
      return Math.max(...state.products.hits.hits.map(p => p['_source']['price']))
    },
    minPriceOfProducts(state) {
      return Math.min(...state.products.hits.hits.map(p => p['_source']['price']))
    },
    maxRateOfProducts(state) {
      return Math.max(...state.products.hits.hits.map(p => p['_source']['yotpo_rating']))
    },
    minRateOfProducts(state) {
      return Math.min(...state.products.hits.hits.map(p => p['_source']['yotpo_rating']))
    },
    filteredProducts(state) {
      if (state.products === '') {
        return;
      }
      function compareProducts(productA, productB) {
        if (state.sortMode === 'priceAsc') {
          return (productA['_source']['price'] < productB['_source']['price']) ? -1 : 1;
        }
        else if (state.sortMode === 'priceDes') {
          return (productA['_source']['price'] < productB['_source']['price']) ? 1 : -1;
        }
        else if (state.sortMode === 'popularityAsc') {
          return (productA['_source']['yotpo_rating'] < productB['_source']['yotpo_rating']) ? -1 : 1;
        }
        else if (state.sortMode === 'popularityDes') {
          return (productA['_source']['yotpo_rating'] < productB['_source']['yotpo_rating']) ? 1 : -1;
        }
      }
      const sortedProducts = state.products.hits.hits.sort(compareProducts).sort(p => p['_source'].stock['is_in_stock'] ? 1 : -1);

      return sortedProducts.filter(
        p =>
          p['_source']['price'] >= state.minPrice &&
          p['_source']['price'] <= state.maxPrice &&
          p['_source']['yotpo_rating'] >= state.minPopularity &&
          p['_source']['yotpo_rating'] <= state.maxPopularity
      );

    },
  },
  mutations: {
    sortMode(state, payload) {
      state.sortMode = payload.value;
    },
    setProducts(state, payload) {
      state.products = payload.products;
    },
    setFilterCriteria(state, payload) {
      state.minPrice = payload.minPrice;
      state.maxPrice = payload.maxPrice;
      state.minPopularity = payload.minPopularity;
      state.maxPopularity = payload.maxPopularity;
    }
  },
  actions: {
    async fetchData(context) {
      const response = await fetch(config.api, {
        method: 'POST',
        body: { "query": { "bool": { "filter": { "bool": { "must": [{ "terms": { "visibility": [2, 3, 4] } }, { "terms": { "status": [0, 1] } }, { "terms": { "category_ids": [5] } }] } } } } }
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || 'Failed to fetch data.'
        );
        throw error;
      }

      context.commit('setProducts', {
        products: responseData,
      });
    },
  },
})
