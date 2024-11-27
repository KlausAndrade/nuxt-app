<template>
  <div class="container mx-auto p-4">
    <div v-if="error" class="text-red-500">Error: {{ error }}</div>
    <div v-else-if="!product" class="text-gray-500">Loading product...</div>
    <div v-else>

      <NuxtLink @click="$router.back()" class="text-blue-500 hover:underline cursor-pointer">Go back</NuxtLink>

      <Carousel :items-to-show="1" class="h-80 w-full my-4">
        <Slide v-for="(image, index) in product.images" :key="`main-${index}`">
          <img :src="image" alt="Product Image" class="h-80 w-full object-cover cursor-pointer"
            @click="openLightbox(product.images, index)" />
        </Slide>
        <Slide v-if="variant?.images" v-for="(variant, vIndex) in product.variant" :key="`variant-${vIndex}`">
          <img :src="variant.images[0]" alt="Variant Image" class="h-80 w-full object-cover cursor-pointer"
            @click="openLightbox(variant.images, 0)" />
        </Slide>
      </Carousel>

      <h1 class="text-3xl font-bold mb-4">{{ product.name[currentLanguage] }}</h1>
      <p class="text-xl text-gray-700 mb-4">Price: {{ product.price | currency }}</p>
      <p class="text-gray-600 mb-4">Brand: {{ product.brand }}</p>

      <div class="mb-6" v-if="product.variant && product.variant.length > 0">
        <h2 class="text-lg font-semibold mb-2">Available Variants</h2>
        <div v-for="variant in product.variant" :key="variant.color" class="flex items-center gap-4 mb-4">
          <img v-if="variant.images && variant.images.length > 0" :src="variant.images[0]" alt="Variant Image"
            class="h-16 w-16 object-cover cursor-pointer" @click="openLightbox(variant.images, 0)" />
          <div v-else>No Image</div>
          <div>
            <p><strong>Color:</strong> {{ variant.color || 'N/A' }}</p>
            <p v-if="variant.size && variant.size.length > 0">
              <strong>Sizes:</strong> {{ variant.size.join(', ') }}
            </p>
            <p v-else>
              <strong>Sizes:</strong> Not Available
            </p>
            <p><strong>Stock:</strong> {{ variant.stock || 'Out of Stock' }}</p>
          </div>
        </div>
      </div>

      <div v-if="lightboxVisible" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
        <button class="absolute top-4 right-4 text-white text-2xl" @click="closeLightbox">
          &times;
        </button>
        <div class="relative">
          <img :src="lightboxImages[lightboxIndex]" alt="Enlarged Image" class="max-h-[80vh] max-w-[80vw]" />
          <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button v-if="lightboxIndex > 0" class="text-white" @click="prevLightbox">
              Previous
            </button>
            <button v-if="lightboxIndex < lightboxImages.length - 1" class="text-white" @click="nextLightbox">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguage } from '~/composables/useLanguage';
import { Carousel, Slide } from 'vue3-carousel';

const route = useRoute();
const product = ref(null);
const error = ref(null);
const { currentLanguage } = useLanguage();

const lightboxVisible = ref(false);
const lightboxImages = ref([]);
const lightboxIndex = ref(0);

function openLightbox(images, index = 0) {
  lightboxImages.value = images;
  lightboxIndex.value = index;
  lightboxVisible.value = true;
}

function closeLightbox() {
  lightboxVisible.value = false;
  lightboxImages.value = [];
  lightboxIndex.value = 0;
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

onMounted(async () => {
  try {
    const productId = route.params.id;
    product.value = await $fetch(`/api/products/${productId}`);
  } catch (err) {
    console.error('Failed to load product:', err);
    error.value = 'Could not load product.';
  }
});

const formatCurrency = (value) => `DKK ${value.toFixed(2)}`;
</script>
