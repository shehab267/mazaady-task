import type {IBackendResponse , IMainCategoryResponse , ICategoryProperty} from "~/types";
import type { AxiosResponse } from "axios";

function useAxios() {
    const {$axiosInstanceJSON } = useNuxtApp();
    return $axiosInstanceJSON;
}
export default {
    fetchAllCategories(): Promise<AxiosResponse<IBackendResponse<IMainCategoryResponse>>> {
        return useAxios().get("get_all_cats")
    },
    fetchPropertiesByCategory(subCategoryId: string) : Promise<AxiosResponse<IBackendResponse<ICategoryProperty[]>>> {
        return useAxios().get(`properties?cat=${subCategoryId}`)
    },
    fetchChildOptionsForProperty(propertyId: string) : Promise<AxiosResponse<IBackendResponse<any>>> {
        return useAxios().get(`get-options-child/${propertyId}`)
    }
}