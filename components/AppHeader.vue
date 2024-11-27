<template>
  <header class="flex justify-between items-center p-4 bg-gray-100 shadow">
    <h1 class="text-xl font-bold">My App</h1>
    <nav class="hidden md:flex gap-6 items-center">
      <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.to"
        class="px-4 py-2 rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900">
        {{ link.name }}
      </NuxtLink>
      <CategoriesMenu />
    </nav>
    <button @click="toggleLanguage"
      class="hidden md:flex ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      {{ currentLanguage === 'en' ? 'Switch to Danish' : 'Switch to English' }}
    </button>
    <button @click="toggleMenu" class="md:hidden px-2 py-1 text-gray-700 hover:text-gray-900">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
    <div v-if="isMenuOpen" class="absolute top-14 left-0 w-full bg-gray-100 shadow-md rounded p-4 md:hidden">
      <nav>
        <button @click="toggleLanguage"
          class="ml-auto ml-4 px-4 py-2 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          {{ currentLanguage === 'en' ? 'Switch to Danish' : 'Switch to English' }}
        </button>
        <NuxtLink v-for="link in navLinks" :key="link.name" :to="link.to"
          class="block px-4 py-2 rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900">
          {{ link.name }}
        </NuxtLink>
        <CategoriesMenu />
      </nav>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue';
import { useLanguage } from '~/composables/useLanguage';

const isMenuOpen = ref(false);
const navLinks = ref([
  { name: 'HOME', to: '/' },
  { name: 'PRODUCTS', to: '/products' },
]);

const { currentLanguage, toggleLanguage, fetchLanguage } = useLanguage();

onMounted(() => {
  fetchLanguage();
});

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>