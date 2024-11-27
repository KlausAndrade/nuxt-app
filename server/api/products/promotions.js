import mockData from '~/data/data.json';

export default defineEventHandler(() => {
  const promotionalSpots = mockData.promotionalSpots || [];
  return promotionalSpots;
});