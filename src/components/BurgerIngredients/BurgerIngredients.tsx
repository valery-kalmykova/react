import React, {useState, useContext} from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { DataContext } from '../../services/dataContext';
import {menuItemProp} from '../../utils/constants'

interface CardProps {
  dataElement: menuItemProp,
  onClick: () => void
}

const Card: React.FC<CardProps> = ({dataElement, onClick}) => {  
  return <div className={burgerIngredientsStyles.card + ' mb-8'} onClick={onClick}>
        {/* <Counter count={1} size="default"/> */}
        <img className={burgerIngredientsStyles.cardImage + ' mr-4 ml-4'} src={dataElement.image} alt={dataElement.name} />
        <div className={burgerIngredientsStyles.currency + ' mt-1 mb-1'}>
          <p className="text text_type_digits-default pr-2">{dataElement.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredientsStyles.cardTitle + " text text_type_main-default"}>{dataElement.name}</p>
      </div>
}

interface TypeCardsProps {
  type: string,
  handleOpenModal: (dataElement: {}) => void
}

const TypeCards: React.FC<TypeCardsProps> = ({type, handleOpenModal}) => {
  const {productData, setData} = useContext(DataContext);

  return <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {productData.map(dataElement => {
      if (dataElement.type === type) {
        return <Card dataElement={dataElement} key={dataElement._id} onClick={()=>handleOpenModal(dataElement)}/>
      }      
    })}
  </div>
}

const TabSet = () => {
  const [current, setCurrent] = useState('Булки')
  return (
    <div style={{ display: 'flex' }} className='mb-10'>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}

interface BurgerIngredientsProps {
  handleOpenModal: (dataElement: {}) => void
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({handleOpenModal}) => {  
  return (
    <section className={burgerIngredientsStyles.section + ' mr-10'}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
     <TabSet/>
     <div className={burgerIngredientsStyles.scrollSection}>
        <h2 className='text text_type_main-medium mb-6'>Булки</h2>
        <TypeCards type='bun' handleOpenModal={handleOpenModal}/>        
       <h2 className='text text_type_main-medium mb-6 mt-10'>Соусы</h2>
        <TypeCards type='main' handleOpenModal={handleOpenModal}/>
       <h2 className='text text_type_main-medium mb-6 mt-10'>Начинки</h2>
        <TypeCards type='sauce' handleOpenModal={handleOpenModal}/>
      </div>
      
    </section>
  );  
}

export default BurgerIngredients;