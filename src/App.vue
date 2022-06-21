<template>
  <HeaderComponent @showModal="showFilterModal = true" :showHeader="showHeader"></HeaderComponent>
  <teleport to="body">
    <FilterModal :show="showFilterModal" @hideModal="showFilterModal = false"></FilterModal>
  </teleport>
  <router-view />
</template>

<script>
import HeaderComponent from '@/components/Header.vue';
import FilterModal from '@/components/FilterModal.vue';

export default {
  data() {
    return {
      showFilterModal: false,
      showHeader: true,
    }
  },
  components: {
    HeaderComponent,
    FilterModal
  },
  computed: {
    artikels: function () {
      if (this.filteredProducts && this.filteredProducts.length > 0) {
        const productsLength = this.filteredProducts.length;
        return `${productsLength} ${productsLength > 1 ? 'Artikels' : 'Artikel'}`;
      }
      return 'No Artikel found!';
    }
  },
  mounted() {
    const self = this;
    let lastScrollTop = 0;
    window.addEventListener("scroll", function () {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        self.showHeader = false;
      } else {
        self.showHeader = true;
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }, false);
  },
  async created() {
    await this.$store.dispatch('fetchData');
  },
}
</script>