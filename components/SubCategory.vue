<template>
    <ul class="space-y-2">
      <li v-for="category in categories" :key="category.id" class="ml-4">
        <div class="text-gray-700 hover:underline flex items-center">
          <NuxtLink
            :to="`/categories/${category.id}`"
            class="hover:text-blue-500 transition"
          >
            {{ category.name[currentLanguage] }}
          </NuxtLink>
        </div>
  
        <SubCategory
          v-if="category.categories && category.categories.length"
          :categories="category.categories"
        />
      </li>
    </ul>
  </template>
  
  <script setup>
  import SubCategory from '~/components/SubCategory.vue';
  
  const props = defineProps({
    categories: {
      type: Array,
      required: true,
    },
  });
  
  const { currentLanguage } = useLanguage();
  </script>