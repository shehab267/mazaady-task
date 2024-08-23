export interface IMainCategory {
        id: number | string;
        name: string;
        description: null;
        image:string;
        slug: string;
        circle_icon : string;
        disable_shipping: number;
        children: ISubCategory[];
}
export interface ISubCategory {
    id: number;
    name: string;
    description: null;
    image:string;
    slug: string;
    children: null;
    circle_icon: string;
    disable_shipping: number;
}
export interface ICategoryProperty {
    description : string;
    id : NumberConstructor;
    list : boolean;
    name : string;
    options : ICategoryPropertyOption[];
    other_value : null|unknown;
    slug : string;
    type : null|unknown;
    value :string;
}
export interface ICategoryPropertyOption {
    options: any;
    child : boolean;
    id : number | string;
    name : string;
    parent ?: number;
    slug : string;
}

export interface IMainCategoryResponse {
    categories : IMainCategory[],
    ads_banners : any[],
    google_version : string,
    huawei_version : string,
    ios_latest_version : string,
    ios_version : string,
}
