<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Categories</h1>
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
      <div v-else-if="!categories.length" class="text-gray-500">No categories available</div>
      <div v-else>
        <CategoriesList :categories="categories" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import CategoriesList from '~/components/CategoriesList.vue';
  
  const categories = ref([]);
  const error = ref(null);
  
  onMounted(async () => {
    try {
      const response = await $fetch('/api/products/categories');
      categories.value = response;
    } catch (err) {
      console.error('Failed to load categories:', err);
      error.value = 'Could not load categories.';
    }
  });
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style>