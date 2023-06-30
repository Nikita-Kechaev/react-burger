export enum IngredientType {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main',
}

export type Ingredient = {
    _id: string;
    name: string;
    type: IngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid?: string;
};


export type RootState = {
    user?: any; 
    constructorArr?: any;
    order?: any;
    ingredients?: any;
    bun?: any;
}

export type TMoveCard = {
    dragIndex:string, 
    hoverIndex:string
}

export type TMainElementProps = {
    id: string;
    item:Ingredient;
    index:string;
    moveCard:any;
}

export type TModalProps = {
    onClose: () => void;
    children?: React.ReactNode;
}