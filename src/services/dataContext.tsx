import React from 'react';
interface IDataContext {
  productData,
  setData
}
export const DataContext = React.createContext<IDataContext>({
  productData: [],
  setData: () => {},
});
