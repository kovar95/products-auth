export type Product = {
  app_id: string;
  product_id: string;
  title: string;
  image_url: string;
  body: string;
  prices: Array<{
    price: number;
    member_price: number;
  }>;
};
