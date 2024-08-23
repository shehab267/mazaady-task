<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  customClasses: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
    type="text"
    class="focus:border-primary-500 focus:ring-primary-500 block w-full rounded-md border-gray-300 py-1.5 shadow-sm sm:text-sm"
    :class="customClasses"
    autofocus
    required
  />
</template>
