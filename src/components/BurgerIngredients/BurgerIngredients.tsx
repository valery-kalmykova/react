import React, {useState} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { data } from '../../utils/data.js'

const Card = ({card}) => (
  <div className={burgerIngredientsStyles.card + ' mb-8'}>
        {/* <Counter count={1} size="default"/> */}
        <img className={burgerIngredientsStyles.cardImage + ' mr-4 ml-4'} src={card.image} alt={card.name} />
        <div className={burgerIngredientsStyles.currency + ' mt-1 mb-1'}>
          <p className="text text_type_digits-default pr-2">{card.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredientsStyles.cardTitle + " text text_type_main-default"}>{card.name}</p>
      </div>
)

Card.propTypes = {
  card: PropTypes.object,
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string
}

const TypeCards = ({data, prop}) => (
  <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {data.map(dataElement => {
      if (dataElement.type === prop) {
        return <Card card={dataElement} key={dataElement._id}/>
      }      
    })}
  </div> 
)

TypeCards.propTypes = {
  dataElement: PropTypes.object,
  _id: PropTypes.string
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

const BurgerIngredients = () => {    
  return (
    <section className={burgerIngredientsStyles.section + ' mr-10'}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
     <TabSet/>
     <div className={burgerIngredientsStyles.scrollSection}>
        <h2 className='text text_type_main-medium mb-6'>Булки</h2>
        <TypeCards data={data} prop='bun'/>        
       <h2 className='text text_type_main-medium mb-6 mt-10'>Соусы</h2>
        <TypeCards data={data} prop='main'/>
       <h2 className='text text_type_main-medium mb-6 mt-10'>Начинки</h2>
        <TypeCards data={data} prop='sauce'/>
      </div>
      
    </section>
  );  
}

export default BurgerIngredients;