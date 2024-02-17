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

// review 타입
export type Review_t = {
    nickname: string;
    content: string;
    createdAt: string;
};
