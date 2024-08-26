<script setup lang="ts">
/**
 * form.vue
 *
 * This component implements a dynamic form for selecting categories and their properties.
 * It includes main category and sub-category selection, along with dynamic property inputs.
 *
 * Key Features:
 * 1. Two-level category selection (main and sub-category)
 * 2. Dynamic property input based on selected category
 * 3. Recursive property options with child options support
 * 4. Table generation based on form input
 *
 * Component Structure:
 * - Data Management: Reactive form data and computed properties
 * - API Interactions: Fetching categories, properties, and child options
 * - Dynamic UI: Renders inputs based on fetched data
 * - Form Submission: Generates a table of selected options
 *
 * Key Functions:
 * - getProperties(): Fetches and sets up properties for the selected sub-category
 * - getChildOptions(selectedOption): Fetches and updates child options for a selected property
 * - generateTable: Creates a table representation of selected form data
 * - resetForm: Clears form data when main or sub-category changes
 *
 * Template Structure:
 * - Main category dropdown
 * - Sub-category dropdown (conditional)
 * - Dynamic property inputs (uses category-recursive-options component)
 * - Submit button
 * - Generated table display
 *
 * Note: This component relies on several external utilities and components:
 * - v-select for dropdown functionality
 * - category-recursive-options for nested property inputs
 */

import {storeToRefs} from 'pinia';

import {
  ICategoryProperty,
  ISubCategory,
  ICategoryPropertyOption,
} from '@/types';
const otherStaticOption = {
  child: false,
  id: 'other',
  name: 'Other',
  slug: 'other',
};
const formData = reactive({
  selected_main_category: '',
  selected_sub_category: '',
  props_values: [] as ICategoryProperty[],
});
const loading = ref(false);
const table: Ref<[value: string, name: string][]> = ref([]);
const {
  fetchMainCategories,
  fetchPropertiesByCategory,
  fetchChildOptionsForProperty,
} = useCategory();
const {getMainCategoriesList} = storeToRefs(useCategory());

const {data, error, pending, refresh} = await useLazyAsyncData(async () => {
  const response = await fetchMainCategories();
  console.log('🚀 ~ response:', response);
  return response;
});

const getSubCategory: ComputedRef<ISubCategory[] | undefined> = computed(() => {
  const mainCategory = getMainCategoriesList.value.find(
    (category) => category.id == formData.selected_main_category,
  );

  return mainCategory?.children ? mainCategory.children : undefined;
});

// * Fetches properties by the selected sub category and updates the form data.
const getProperties = async () => {
  loading.value = true;
  // reset table
  table.value = [];
  try {
    let properties = await fetchPropertiesByCategory(
      formData.selected_sub_category,
    );
    formData.props_values = properties?.map((property) => {
      return {
        ...property,
        options: [
          ...property.options,
          otherStaticOption,
        ] as ICategoryPropertyOption[],
      };
    });
  } finally {
    loading.value = false;
  }
};

/**
 * Updates the provided options by adding a static 'other' option to each option.
 *
 * @param {ICategoryPropertyOption[]} options - The original options to be updated.
 * @param {ICategoryPropertyOption[]} newOptions - The new options to be updated with the static 'other' option.
 * @return {Ref<ICategoryPropertyOption[]>} A reactive reference to the updated options.
 */
const updateOption = (
  options: ICategoryPropertyOption[],
  newOptions: ICategoryPropertyOption[],
) => {
  let newOptionsWithOther = [...newOptions].map((option) => {
    return {
      ...option,
      options: [...option.options, otherStaticOption],
    };
  });
  return toRef(newOptionsWithOther);
};

/**
 * Recursively updates child options for a selected property option.
 *
 * This function traverses the property structure to find the selected option
 * and updates its child options with new data. It handles nested option
 * structures by recursively searching through all levels.
 *
 */
const setChildOptions = (
  selectedOption: ICategoryPropertyOption,
  newOptions: ICategoryPropertyOption[],
  props_values,
) => {
  // Loop through each property in the array
  for (let props of props_values) {
    // Try to find the selected option in the current property's options
    let optionIndex = props.options.findIndex(
      (option: {id: string | number}) => option.id == selectedOption.id,
    );
    if (optionIndex != -1) {
      // If found, update the child options
      props.options[optionIndex] = {
        ...props.options[optionIndex],
        options: updateOption(props.options[optionIndex].options, newOptions),
      };
      break;
    } else {
      // If not found, check child options of each option
      for (let option of props.options) {
        if (option.options?.length) {
          // Recursively search in child options
          setChildOptions(selectedOption, newOptions, option.options);
        }
      }
    }
  }
};

const getChildOptions = async (selectedOption: ICategoryPropertyOption) => {
  loading.value = true;

  try {
    // Fetch the new child options from the API
    let newChildOptions = await fetchChildOptionsForProperty(selectedOption.id);
    // Find the selected option in the form data and update its child options
    setChildOptions(selectedOption, newChildOptions, formData.props_values);
  } finally {
    loading.value = false;
  }
};
/**
 * Recursively searches for a matching value within a nested object structure.
 * If a match is found, it adds the corresponding name and value to the `table.value` array.
 */
const getRecursivekeyByValue = (propertyObject, value) => {
  for (let option of propertyObject.options) {
    // If the current option's id matches the value, push its name and value to the table.
    if (option.id == value) {
      table.value.push({
        name: propertyObject.name,
        value: option.name,
      });
    }
    // If the current option has nested options, recursively search within them.
    if (option.options?.length) {
      getRecursivekeyByValue(propertyObject, value);
    }
    // If the option's other_value matches the value, push its name and value to the table.
    else if (option.other_value == value) {
      table.value.push({
        name: propertyObject.name,
        value: option.other_value,
      });
    }
  }
};
/*
 * Finds and adds the selected option to the `table.value` array.
 * Handles both direct options and nested options recursively.
 */
const getSelectedOption = (property) => {
  // If there's an other_value, add it directly to the table.
  if (property.other_value) {
    table.value.push({
      name: property.name,
      value: property.other_value,
    });
    // Otherwise, search through the available options.
  } else {
    for (let option of property.options) {
      // If an option matches the property value, add it to the table.
      if (option.id == property.value) {
        table.value.push({
          name: property.name,
          value: option.name,
        });
      }
      // If there's an other_value, add it to the table.
      else if (option.other_value) {
        table.value.push({
          name: property.name,
          value: option.other_value,
        });
      }
      if (option.options?.length) {
        getSelectedOption(option);
      }
    }
  }
};
/**
 * Generates a table by iterating through each property in the form data.
 * Calls `getSelectedOption` for each property with a value to populate the table.
 */
const generateTable = () => {
  table.value = []; // Reset the table before populating it.

  for (let prop of formData.props_values) {
    // If the property has a value, process it.
    if (prop.value) {
      getSelectedOption(prop);
    }
    // If the property only has an other_value, add it directly to the table.
    else if (prop.other_value) {
      table.value.push({
        name: prop.name,
        value: prop.other_value,
      });
    }
  }
};

// Resets the form when the main category changes.
watch(
  () => formData.selected_main_category,
  (newValue) => {
    resetForm();
  },
);
// Resets the form when the sub category changes to null.
watch(
  () => formData.selected_sub_category,
  (newValue) => {
    if (newValue == null) resetForm();
  },
);

function resetForm() {
  formData.selected_sub_category = '';
  formData.props_values = [];
  table.value = [];
}
</script>

<template>
  <div class="flex w-full items-center justify-center py-20">
    <!-- loader -->
    <base-loader v-if="loading || pending" />
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center rounded bg-red-100 p-4"
    >
      <h2 class="mb-2 text-center text-xl font-bold text-red-500">Error</h2>
      <p class="text text-center text-red-500">{{ error.message }}</p>

      <base-button
        class="mt-4 rounded border border-gray-400 bg-white px-4 py-2 font-semibold text-gray-800 shadow hover:bg-gray-100"
        @click="refresh"
        >Try Again</base-button
      >
    </div>
    <div v-else>
      <form @submit.prevent="generateTable">
        <div class="flex flex-col items-center justify-center">
          <h1 class="mb-5 text-3xl font-bold">Form</h1>
          <p class="mb-5 text-gray-500">Please fill out the form below</p>
        </div>
        <div class="grid min-w-96 grid-cols-12 justify-items-center gap-1">
          <div class="col-span-12 grid w-full justify-items-center gap-3">
            <div class="w-full">
              <v-select
                placeholder="Select a main category"
                label="name"
                :options="getMainCategoriesList"
                :reduce="(option) => option.id"
                v-model="formData.selected_main_category"
              ></v-select>
            </div>
            <div v-if="getSubCategory?.length" class="w-full">
              <v-select
                class="w-full"
                placeholder="Select a sub category"
                label="name"
                :options="getSubCategory"
                :reduce="(option) => option.id"
                v-model="formData.selected_sub_category"
                @option:selected="getProperties"
              ></v-select>
            </div>
          </div>
          <div
            class="col-span-12 w-full max-w-xl justify-items-center"
            v-if="formData.props_values.length"
          >
            <category-recursive-options
              v-for="property in formData.props_values"
              :key="property.id + 'recursive'"
              :property="property"
              @select-option="getChildOptions"
            />
          </div>
        </div>
        <div class="mt-5 flex items-center justify-center">
          <base-button class="w-fit px-5 py-3" type="submit"
            >Submit</base-button
          >
        </div>
      </form>
      <div class="mt-5" v-if="table.length">
        <table class="w-full border-collapse border border-green-800">
          <thead>
            <tr class="bg-green-700">
              <th class="px-4 py-2 text-white">Property</th>
              <th class="px-4 py-2 text-white">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in table"
              :key="index"
              class="hover:bg-green-100"
            >
              <td class="border border-green-800 px-4 py-2">
                {{ item.name }}
              </td>
              <td class="border border-green-800 px-4 py-2">
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
