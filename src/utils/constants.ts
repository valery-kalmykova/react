export interface menuItemProp {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  uuid?: string
};

export const itemDefault = {
  _id: '',
  name: '',
  type: '',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
}

export interface order {
  _id: string,
  name: string,
  number: number,
  updatedAt: string,
  createdAt: string,
  status: string,
  ingredients: string
};

export interface userData {
  email?: string, 
  password: string, 
  name?: string
}

export const userDefault = {
  email: '', 
  password: '', 
  name: ''
}

export const baseUrl = 'https://norma.nomoreparties.space/api';
export const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

export function checkResponse(res: any) {
  if (res.ok) {
    return res.json();    
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }  
}

export const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;