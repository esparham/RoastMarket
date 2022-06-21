// productsPricePerKg(state) {
//   if (state.products === '') {
//     return;
//   }
//   function comparePricePerKg(productA, productB) {
//     if (productA['_source']['price_per_kg'] < productB['_source']['price_per_kg']) {
//       if (state.priceSortOrder == 1) {
//         return -1;
//       } return 1;
//     }
//     // productA['_source'].stock['is_in_stock']
//     if (productA['_source']['price_per_kg'] > productB['_source']['price_per_kg']) {
//       if (state.priceSortOrder === 1) {
//         return 1;
//       }
//       return -1
//     }
//     return 0;
//   }
//   return state.products.hits?.hits.sort(comparePricePerKg).filter(p => p['_source']['price_per_kg'] >= state.minPrice && p['_source']['price_per_kg'] <= state.maxPrice);
// },
// productsPopularity(state) {
//   if (state.products === '') {
//     return;
//   }
//   function comparePopularity(productA, productB) {
//     if (productA['_source']['yotpo_rating'] < productB['_source']['yotpo_rating']) {
//       if (state.popularitySortOrder === 1) {
//         return -1;
//       }
//       return 1
//     }
//     if (productA['_source']['yotpo_rating'] > productB['_source']['yotpo_rating']) {
//       if (state.popularitySortOrder === 1) {
//         return 1;
//       }
//       return -1
//     }
//     return 0;
//   }
//   return state.products.hits.hits.sort(comparePopularity).filter(p => p['_source']['yotpo_rating'] >= state.minPopularity && p['_source']['yotpo_rating'] <= state.maxPopularity);
// },
//     //////////////