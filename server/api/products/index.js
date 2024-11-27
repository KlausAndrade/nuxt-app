import { getQuery } from 'h3';
import mockData from '~/data/data.json';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const { category, brand } = query;

  let filteredProducts = mockData.products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) =>
      product.categories ? product.categories.includes(category) : false
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brand
    );
  }

  return filteredProducts;
});