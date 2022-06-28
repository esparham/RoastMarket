<template>
  <section class="contents">
    <div class="center">
      <div class="resultNum">{{ artikels }}</div>
      <CardWrapper>
        <ProductCard v-for="product of filteredProducts" :key="product._id" :product="product"></ProductCard>
      </CardWrapper>
    </div>
  </section>
</template>


<script>
import { mapGetters } from 'vuex';
import ProductCard from '@/components/ProductCard.vue';
import CardWrapper from '@/components/CardWrapper.vue';

export default {
  data() {
    return {
      showFilterModal: false,
      showHeader: true,
    }
  },
  components: {
    ProductCard,
    CardWrapper,
  },
  computed: {
    ...mapGetters(['filteredProducts']),
    artikels: function () {
      if (this.filteredProducts && this.filteredProducts.length > 0) {
        const productsLength = this.filteredProducts.length;
        return `${productsLength} ${productsLength > 1 ? 'Artikels' : 'Artikel'}`;
      }
      return 'No Artikel found!';
    }
  },

  async created() {
    await this.$store.dispatch('fetchData');
  },
}
</script>
