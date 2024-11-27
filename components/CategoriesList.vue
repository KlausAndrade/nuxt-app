<template>
    <ul class="space-y-2">
        <li v-for="category in categories" :key="category.id" class="ml-4">
            <div class="flex items-center">
                <NuxtLink :to="`/categories/${category.id}`" class="text-gray-700 hover:text-blue-500 transition"
                    exact-active-class="font-bold text-black">
                    {{ category.name[currentLanguage] }}
                </NuxtLink>
            </div>

            <CategoriesList v-if="category.categories && category.categories.length"
                :categories="category.categories" />
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    categories: {
        type: Array,
        required: true,
    },
});

const { currentLanguage } = useLanguage();

const isActiveCategory = (categoryId) => {
    return route.params.id === categoryId.toString();
};
</script>