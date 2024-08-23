import { defineStore } from "pinia";
import CategoryService from "@/services/Category";
import type { IMainCategory , ICategoryProperty } from "@/types/category";

export const useCategory = defineStore({
  id: "category",
  state: () => ({
    mainCategories: [] as IMainCategory[],
    categoryProperties: [] as ICategoryProperty[],
  }),
  getters: {
    getMainCategoriesList(state) {
      return state.mainCategories;
    },
    getCategoryProperties(state) {
        const otherStaticOption = {
            id: 0,
            name: "other",
            description: null,
            slug: "other",
            child: false,
        }
        return state.categoryProperties.map((property) => {
            return {
                ...property,
                options: [...property.options, otherStaticOption]
            }
        })
    }
  },
  actions: {
    async fetchMainCategories() {
      try {
        let response = await CategoryService.fetchAllCategories();
        console.log(response);
        this.mainCategories = response.data.data.categories
        return response.data.data;
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async fetchPropertiesByCategory(subCategoryId: string) {
        try{
            let response = await CategoryService.fetchPropertiesByCategory(subCategoryId);
            return response.data.data;
        }catch(e){
            return Promise.reject(e);
        }
    },
    async fetchChildOptionsForProperty(propertyId: string) {
      try {
        let response = await CategoryService.fetchChildOptionsForProperty(propertyId);
        return response.data.data;
      } catch (e) {
        return Promise.reject(e);
      }
    }
  },
});
