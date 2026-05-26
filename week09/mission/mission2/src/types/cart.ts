export type Lp = {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
};

export type CartItems = Lp[]; //Lp 자체가 하나의 객체이므로
