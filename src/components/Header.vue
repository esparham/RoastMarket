<template>
  <div class="headerHolder">
    <header :class="showHeaderHandler">
      <div class="center">
        <div class="logo">
          <a href="/">
            <img src="logo.svg" alt="RoastMarket" />
          </a>
        </div>
        <div class="headContent">
          <div class="catName">
            <h1>Kaffee &amp; Espresso</h1>
          </div>
          <div class="filterButtonsPane">
            <a href="#" class="filterBtn" @click.prevent="showModal">Filter</a>
            <select class="sortDdl" v-model="sortMode">
              <option value="priceAsc">Sort By Price ascending</option>
              <option value="priceDes">Sort By Price descending</option>
              <option value="popularityAsc">Sort By Popularity ascending</option>
              <option value="popularityDes">Sort By Popularity descending</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderView',
  data() {
    return {
    }
  },
  props: ['showHeader'],
  computed: {
    showHeaderHandler() {
      return this.showHeader ? 'fixedHeader' : 'floadHeader'
    },
    sortMode: {
      get() {
        return this.$store.state.sortMode;
      },
      set(value) {
        this.$store.commit('sortMode', { value });
      },
    },
  },
  methods: {
    showModal() {
      this.$emit('showModal');
    }
  }
}
</script>