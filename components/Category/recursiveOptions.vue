<script setup lang="ts">
defineProps({
  property: {
    type: Object,
    default: null,
  },
});
const emit = defineEmits(['select-option']);
const hasChildern = (option) => {
  return option.child;
};
const getChildOptions = async (prop) => {
  let optionIndex = prop?.options?.findIndex(
    (option) => option.id == prop.value,
  );
  if (hasChildern(prop)) {
    emit('select-option', prop);
  } else if (hasChildern(prop.options[optionIndex])) {
    emit('select-option', prop.options[optionIndex]);
  }
};
</script>
<template>
  <label class="text-gray-500">{{ property.name }}</label>
  <v-select
    class="mb-1"
    :placeholder="`Select ${property.name}`"
    label="name"
    :options="property.options"
    :reduce="(option) => option.id"
    v-model="property.value"
    @option:selected="getChildOptions(property)"
  ></v-select>

  <base-text-input
    :key="property.id + 'other'"
    v-if="property.value == 'other'"
    v-model="property.other_value"
    :placeholder="`write value for ${property.name}`"
    customClasses="border-gray-500 mt-2"
  >
  </base-text-input>

  <div
    v-if="
      property?.options?.[
        property?.options?.findIndex((option) => option.id == property.value)
      ]?.options?.length
    "
  >
    <category-recursive-options
      v-for="prop in property.options[
        property.options.findIndex((option) => option.id == property.value)
      ]?.options"
      :property="prop"
      :key="prop.id + 'recursive'"
      @select-option="getChildOptions"
    />
  </div>
</template>
