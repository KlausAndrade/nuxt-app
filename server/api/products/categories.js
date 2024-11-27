import mockData from '~/data/data.json';

export default defineEventHandler(() => {
  const rootCategories = mockData.categories.categories;
  return rootCategories;
});