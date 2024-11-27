<template>
    <nav class="group">
        <NuxtLink to="/categories" class="px-4 py-2 rounded text-gray-700 hover:bg-gray-200 hover:text-gray-900">
            CATEGORIES
        </NuxtLink>
        <div class="relative group-hover:block hidden">
            <div class="overflow-y-scroll max-h-[50vh] absolute z-50 py-2 bg-gray-400 w-72 rounded">
                <div v-if="!categories.length" class="text-gray-500">No categories available</div>
                <div v-else>
                    <SubCategory :categories="categories" />
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SubCategory from '~/components/SubCategory.vue';

const categories = ref([]);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await $fetch('/api/products/categories');
        categories.value = response;
    } catch (err) {
        console.error('Failed to fetch categories:', err);
        error.value = 'Could not load categories.';
    }
});
</script>