<template>
    <div class="md:rounded shadow hover:shadow-lg transition group relative overflow-hidden">
      <Carousel :items-to-show="1" class="w-full">
        <Slide v-for="(image, index) in product.images" :key="`main-${index}`">
          <div class="relative overflow-hidden">
            <img
              :src="image"
              alt="Product Image"
              class="w-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              @click="$emit('open-lightbox', product.images, index)"
            />
          </div>
        </Slide>
        <Slide v-for="(variant, vIndex) in product.variant" :key="`variant-${vIndex}`">
          <div class="relative overflow-hidden">
            <img
              v-if="variant.images"
              :src="variant.images[0]"
              alt="Variant Image"
              class="w-full object-cover cursor-pointer transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
              @click="$emit('open-lightbox', variant.images, 0)"
            />
          </div>
        </Slide>
      </Carousel>
      <div v-if="!product.images?.length" class="h-full w-full bg-gray-100 flex items-center justify-center">
        No Image
      </div>
      <div
        class="absolute bottom-0 left-0 w-full bg-white p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
      >
        <h2 class="text-lg font-semibold">
          {{ product.name[currentLanguage] || product.name['en'] || "Product name" }}
        </h2>
        <NuxtLink :to="`/products/${product.id}`" class="text-blue-500 hover:underline shrink-0">
          View Details
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useLanguage } from '~/composables/useLanguage';
  
  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  });
  
  const { currentLanguage } = useLanguage();
  </script>