import mockData from '~/data/data.json';

export default defineEventHandler((event) => {
  const { id } = event.context.params;
  const product = mockData.products.find((p) => p.id === parseInt(id));
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    });
  }

  return product;
});