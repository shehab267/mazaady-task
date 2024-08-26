<template>
  <div>
    <img
      v-if="!$props.favorited"
      class="w-4 cursor-pointer md:w-6"
      src="@/assets/icons/heart.svg"
      alt="favorite icon"
    />
    <img
      v-else
      class="w-4 cursor-pointer md:w-6"
      src="@/assets/icons/heart-outline.svg"
      alt="unfavorite icon"
    />
  </div>
</template>

<script setup>
defineProps({
  favorited: Boolean,
});
</script>

<style scoped></style>
