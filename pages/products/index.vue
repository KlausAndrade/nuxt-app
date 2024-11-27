<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Product List ({{ currentLanguage }})</h1>
    <div v-if="error" class="text-red-500">Error: {{ error }}</div>
    <div v-else-if="!mixedContent.length" class="text-gray-500">No products or promotions available</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 gap-y-4 md:gap-4">
      <div
        v-for="item in mixedContent"
        :key="item.id || `promo-${item.position}`"
        :class="item.type === 'promo' ? getPromoClasses(item) : ''"
      >
        <ProductCard v-if="item.type === 'product'" :product="item" @open-lightbox="openLightbox" />
        <PromotionalSpot v-else-if="item.type === 'promo'" :spot="item" @open-lightbox="openLightbox" />
      </div>
    </div>

    <div
      v-if="lightboxVisible"
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
    >
      <button class="absolute top-4 right-4 text-white text-2xl z-60" @click="closeLightbox">
        &times;
      </button>
      <div class="relative">
        <img
          :src="lightboxImages[lightboxIndex]"
          alt="Enlarged Image"
          class="max-h-[80vh] max-w-[80vw] z-60"
        />
        <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-4 z-60">
          <button
            v-if="lightboxIndex > 0"
            class="text-white"
            @click="prevLightbox"
          >
            Previous
          </button>
          <button
            v-if="lightboxIndex < lightboxImages.length - 1"
            class="text-white"
            @click="nextLightbox"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useLanguage } from '~/composables/useLanguage';
import ProductCard from '~/components/ProductCard.vue';
import PromotionalSpot from '~/components/PromotionalSpot.vue';

const products = ref([]);
const promotionalSpots = ref([]);
const error = ref(null);
const { currentLanguage } = useLanguage();

const lightboxVisible = ref(false);
const lightboxImages = ref([]);
const lightboxIndex = ref(0);

function openLightbox(images, index) {
  lightboxImages.value = images;
  lightboxIndex.value = index;
  lightboxVisible.value = true;

  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightboxVisible.value = false;
  document.body.style.overflow = '';
}

function prevLightbox() {
  if (lightboxIndex.value > 0) {
    lightboxIndex.value--;
  }
}

function nextLightbox() {
  if (lightboxIndex.value < lightboxImages.value.length - 1) {
    lightboxIndex.value++;
  }
}

function getPromoClasses(item) {
  if (item.type == 'promo') {
    if (item.layout) {
      return {
        '1x1': 'col-span-1 row-span-1',
        '2x1': 'col-span-2 row-span-1',
        '1x2': 'col-span-1 row-span-2',
        '2x2': 'col-span-2 row-span-2',
      }[item.layout]
    }
  }
  return '';
}

const mixedContent = computed(() => {
  const content = [];
  let productIndex = 0;

  for (let i = 0; i < products.value.length + promotionalSpots.value.length; i++) {
    const promo = promotionalSpots.value.find((spot) => spot.position === i + 1);
    if (promo) {
      content.push({ ...promo, type: 'promo', layout: promo.type });
    } else if (productIndex < products.value.length) {
      content.push({ ...products.value[productIndex], type: 'product' });
      productIndex++;
    }
  }

  return content;
});

onMounted(async () => {
  try {
    products.value = await $fetch('/api/products');
    promotionalSpots.value = await $fetch('/api/products/promotions');
  } catch (err) {
    console.error('Failed to load data:', err);
    error.value = 'Could not load products or promotions.';
  }
});
</script>