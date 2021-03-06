import React from 'react';
import { useSelector } from '../services/hooks/hooks';
import { useParams, Redirect }from 'react-router-dom';
import styles from './pages.module.css'
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import { menuItemProp } from '../utils/constants';
import { Loader } from '../ui/Loader/Loader';

const Ingredient: React.FC = () => {  
  const { id } = useParams<{id?: string}>();  
  const productData = useSelector(state => state.products.productData);
  const item = productData.find((element: menuItemProp) => element._id === id);  
  const itemSuccess = useSelector(state => state.products.response); 
  
  if (!itemSuccess) {
    return <Loader size="large" inverse={true}/>
  }
  
  if (itemSuccess && item) return (    
    <div className={styles.ingredientMain}>
      <IngredientDetails item={item}/>
    </div>    
  )  
  return (<Redirect to='/404'/>)
}

export default Ingredient
