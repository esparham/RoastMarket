<template>
  <div class="filterBox" :style="showModal">
    <div class="filterTitle">
      <a class="closeFilter" @click.prevent="handleHideModal"><span></span></a>
      Filters
    </div>
    <div class="filterContent">
      <div class="FilterItem">
        <div class="FilterHead">
          Price
        </div>
        <label for="min-price">Min Price</label>
        <div class="rangeSelect">
          <input type="range" min="0" max="50" v-model.number="minPrice" />
          <p>{{ minPrice }}</p>
        </div>
        <label for="max-price">Max Price</label>
        <div class="rangeSelect">
          <input type="range" min="0" max="50" v-model.number="maxPrice" />
          <p>{{ maxPrice }}</p>
        </div>
        <div class="FilterHead">
          Popularity
        </div>
        <label for="min-popularity">Min Popularity</label>
        <div class="rangeSelect">
          <input type="range" min="0" max="5" v-model.number="minPopularity" />
          <p>{{ minPopularity }}</p>
        </div>
        <label for="max-popularity">Max Popularity</label>
        <div class="rangeSelect">
          <input type="range" min="0" max="5" v-model.number="maxPopularity" />
          <p>{{ maxPopularity }}</p>
        </div>
      </div>

    </div>
    <a class="btnSubmitFilter" @click.prevent="handleHideModal">Submit Filters</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['show'],
  data() {
    return {
      minPrice: 0,
      maxPrice: 50,
      minPopularity: 0,
      maxPopularity: 5,
    }
  },
  methods: {
    handleHideModal() {
      this.$store.commit('setFilterCriteria', {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        minPopularity: this.minPopularity,
        maxPopularity: this.maxPopularity,
      });
      this.$emit('hideModal');
    }

  },
  computed: {
    ...mapGetters(['maxPriceOfProducts', 'minPriceOfProducts', 'maxRateOfProducts', 'minRateOfProducts']),
    showModal: function () {
      const showStyle = `${this.show ? 'display: block' : 'display: none'}`;
      return showStyle;
    }
  }
}
</script>