import React from 'react';
import {menuItemProp} from '../utils/constants'

interface IDataContext {
  productData: menuItemProp[],
  setData: (productData: menuItemProp[]) => void
}

export const DataContext = React.createContext<IDataContext>({
  productData: [],
  setData: () => {},
});
