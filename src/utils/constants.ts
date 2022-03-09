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

export const urlData = 'https://norma.nomoreparties.space/api/ingredients';
export const urlOrder = 'https://norma.nomoreparties.space/api/orders'

export const filteredData = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",    
  },
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    name: "Филе Люминесцентного тетраодонтимформа",
    price: 988,
    proteins: 44,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733c8",    
  },
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
    name: "Соус фирменный Space Sauce",
    price: 80,
    proteins: 50,
    type: "sauce",
    __v: 0,
    _id: "60d3b41abdacab0026a733cd",    
  }
]