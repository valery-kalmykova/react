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
  updatedAt: Date,
  createdAt: Date,
  status: string,
  ingredients: string[]
};

export const orderDefault = {
  _id: '',
  name: '',
  number: 0,
  updatedAt: new Date(),
  createdAt: new Date(),
  status: '',
  ingredients: []
}

export interface userData {
  email: string, 
  password: string, 
  name: string
}

export interface loginData {
  email: string, 
  password: string  
}

export const userDefault = {
  email: '', 
  password: '', 
  name: ''
}

export const baseUrl = 'https://norma.nomoreparties.space/api';
export const wsUrl = 'wss://norma.nomoreparties.space/orders';

export function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();    
  } else {
    return Promise.reject(`Ошибка ${res.status}`);
  }  
}

export const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
