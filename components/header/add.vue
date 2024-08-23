<template>
  <button class="gradient-button-cta flex items-center gap-1 px-4 py-3">
    <AtomIconAdd />
    <span class="text-sm font-bold capitalize text-white">
      {{ props.placeholder }}
    </span>
  </button>
</template>

<script setup>
// Add props placehorlder

const props = defineProps({
  placeholder: {
    type: String,
  },
});
</script>

<style>
.gradient-button-cta {
  border-radius: 10px;
  background: var(
    --linear-red-orange,
    linear-gradient(90deg, #d20653 0%, #ff951d 100%)
  );
}
</style>
