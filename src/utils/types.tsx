export enum IngredientType {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main',
}

export type Ingredient = {
    _id: string;
    name: string;
    // type: IngredientType;
    type: 'bun' | 'sauce' | 'main';
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
    count: number;
};

export type TMoveCard = {
    dragIndex:string, 
    hoverIndex:string
}

export type TMainElementProps = {
    id: string;
    item:Ingredient;
    index:number;
    moveCard:any;
}

export type TModalProps = {
    onClose: () => void;
    children?: React.ReactNode;
}

export type TOrderDetails = {
    element?: React.ReactNode;
}

export type TOrder = {
    readonly ingredients: ReadonlyArray<string>;
    readonly _id: string;
    readonly status: string;
    readonly number: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly name?: string; 
  }

export type TOrders = {
    readonly success : boolean;
    readonly orders: ReadonlyArray<TOrder>;
    readonly ingredients: ReadonlyArray<string>;
    readonly _id: string;
    readonly status: 'done' | 'pending' | 'created';
    readonly number: number;
    readonly createdAt: string;
    readonly updatedAt: string;
    readonly total: number;
    readonly totalToday: number;
    readonly name?: string; 
    count : number;
    price : number;
    image_mobile : string;
    type : string;
}

export type TOrderCard = {
    props?: {
        order: TOrders;
        key: number
    }
    order: TOrders
}

export type TTokens = {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly success: boolean;
    readonly user: {
        readonly email: string;
        readonly name: string;
    }
}

export type TRegForm = {
    email: string, 
    password: string, 
    name: string
}

export type TUser = {
    email: string;
    name: string;
}