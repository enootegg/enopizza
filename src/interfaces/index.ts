export interface ExtraOption {
  _id: string;
  text: string;
  price: number;
}

export interface Pizza {
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: [number, number, number];
  extraOptions: [ExtraOption];
  weight: [number, number, number];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
