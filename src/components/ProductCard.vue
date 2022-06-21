<template>
  <li class="listItem">
    <figure>
      <a>
        <img :src="`https://c.roastmarket.de/media//catalog/product${product._source.image}`"
          :alt="product._source.image_label" />
      </a>
    </figure>
    <div class="prDetail">
      <span class="prPrice">{{ product._source.price }}€</span>
      <span class="prSpec">
        {{ product._source.price_per_kg }}€/ {{ product._source.base_price_base_amount }} {{
            product._source.base_price_base_unit
        }}
      </span>
      <strong>
        {{ product._source.name }}
      </strong>
      <div class="prRate">
        <div class="rate">
          <div class="rateProcess" :style="rating"></div>
          <div class="rateBar">
            <span class="star_line"></span>
            <span class="star_line"></span>
            <span class="star_line"></span>
            <span class="star_line"></span>
            <span class="star_line"></span>
          </div>
        </div>
        <span class="rateNum">{{ product._source.yotpo_review_count }}</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    rating: function () {
      return `width:${this.product._source.yotpo_rating * 20}%`;
    }
  }
}
</script>

