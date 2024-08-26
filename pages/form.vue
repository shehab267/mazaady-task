<script setup lang="ts">
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

onBeforeMount(async () => {
  loading.value = true;
  try {
    await fetchMainCategories();
  } finally {
    loading.value = false;
  }
});

const getSubCategory: ComputedRef<ISubCategory[] | undefined> = computed(() => {
  const mainCategory = getMainCategoriesList.value.find(
    (category) => category.id == formData.selected_main_category,
  );

  return mainCategory?.children ? mainCategory.children : undefined;
});

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

const setChildOptions = (selectedOption, newOptions, props_values) => {
  // recursive function to set child options
  for (let props of props_values) {
    let optionIndex = props.options.findIndex(
      (option) => option.id == selectedOption.id,
    );
    if (optionIndex != -1) {
      props.options[optionIndex] = {
        ...props.options[optionIndex],
        options: updateOption(props.options[optionIndex].options, newOptions),
      };
      break;
    } else {
      for (let option of props.options) {
        if (option.options?.length) {
          setChildOptions(selectedOption, newOptions, option.options);
        }
      }
    }
  }
};
const getChildOptions = async (selectedOption: ICategoryPropertyOption) => {
  loading.value = true;
  try {
    let newChildOptions = await fetchChildOptionsForProperty(selectedOption.id);
    setChildOptions(selectedOption, newChildOptions, formData.props_values);
  } finally {
    loading.value = false;
  }
};
const getRecursivekeyKeyBtValue = (propertyObject, value) => {
  console.log(propertyObject, value);
  for (let option of propertyObject.options) {
    if (option.id == value) {
      table.value.push({
        name: propertyObject.name,
        value: option.name,
      });
    }
    if (option.options?.length) {
      getRecursivekeyKeyBtValue(propertyObject, value);
    } else if (option.other_value == value) {
      table.value.push({
        name: propertyObject.name,
        value: option.other_value,
      });
    }
  }
};
const getSelectedOption = (property) => {
  if (property.other_value) {
    table.value.push({
      name: property.name,
      value: property.other_value,
    });
  } else {
    for (let option of property.options) {
      if (option.id == property.value) {
        table.value.push({
          name: property.name,
          value: option.name,
        });
      } else if (option.other_value) {
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
const generateTable = () => {
  table.value = [];
  for (let prop of formData.props_values) {
    if (prop.value) {
      getSelectedOption(prop);
    } else if (prop.other_value) {
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
  <!-- center -->
  <div class="flex w-full items-center justify-center py-20">
    <!-- loader -->
    <base-loader v-if="loading" />
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
        <!-- <base-table :data="table.filter((el) => el.value)" /> -->
        <!-- Let's implement a table here take name for headers and value for data -->
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
