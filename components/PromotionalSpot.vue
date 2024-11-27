<template>
    <div class="relative rounded shadow hover:shadow-lg transition">
        <a :href="spot.link || '#'" aria-label="Promotional Content"
            class="w-full h-full flex items-center justify-center">
            <img :src="spot.image?.imageUrl"
                :alt="spot.image?.alt || 'Promotional Image'" class="w-full h-full object-cover" />
            <p v-if="spot.imageAltText"
                class="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 text-sm">
                {{ spot.imageAltText }}
            </p>
        </a>
    </div>
</template>

<script setup>
const props = defineProps({
    spot: {
        type: Object,
        required: true,
    },
});
</script>