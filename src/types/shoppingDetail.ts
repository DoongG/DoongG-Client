// product 타입
export type Product_t = {
    productID: number;
    productName: string;
    productImage: string;
    productDescription: string;
    category: string;
    stock: number;
    price: number;
    discountedPrice: number;
    viewCount: number;
    createAt: string;
    reviews: Review_t[];
};

export type Produdct_list_t = {
    discountedPrice: number;
    price: number;
    productID: number;
    productImage: string;
    productName: string;
    stock: number;
    viewCount: number;
    category: string;
};

// review 타입
export type Review_t = {
    nickname: string;
    content: string;
    createdAt: string;
};

// Cart 타입
export type Cart_t = {
    createdAt: string;
    discountedPrice: number;
    price: number;
    productID: number;
    productImage: string;
    productName: string;
    quantity: number;
};
