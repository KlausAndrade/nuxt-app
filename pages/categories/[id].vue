<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Category: {{ categoryId }}</h1>
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else-if="!products.length" class="text-gray-500">No products available</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            :src="product.images[0]"
            alt="Product Image"
            class="h-40 w-full object-cover mb-4"
          />
          <h2 class="text-lg font-semibold">{{ product.name[currentLanguage] }}</h2>
          <p class="text-gray-600">Price: {{ product.price }}</p>
          <NuxtLink :to="`/products/${product.id}`" class="text-blue-500 hover:underline">
            View Details
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useLanguage } from '~/composables/useLanguage';
  
  const route = useRoute();
  const { currentLanguage } = useLanguage();
  const categoryId = route.params.id;
  
  const category = ref(null);
  const products = ref([]);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      const categoriesResponse = await $fetch('/api/categories');
      const findCategory = (id, categories) => {
        for (const category of categories) {
          if (category.id === id) return category;
          if (category.categories) {
            const found = findCategory(id, category.categories);
            if (found) return found;
          }
        }
      };
      category.value = findCategory(categoryId, categoriesResponse);
  
      const productsResponse = await $fetch(`/api/products?category=${categoryId}`);
      products.value = productsResponse;
    } catch (err) {
      console.error('Failed to load data:', err);
      error.value = 'Could not load category or products.';
    }
  });
  </script>