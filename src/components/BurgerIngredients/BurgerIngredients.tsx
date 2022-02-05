import React, {useState} from 'react';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'


const Card = props => {
  return <div className={burgerIngredientsStyles.card + ' mb-8'}>
        {/* <Counter count={1} size="default"/> */}
        <img className={burgerIngredientsStyles.cardImage + ' mr-4 ml-4'} src={props.image} alt={props.name} />
        <div className={burgerIngredientsStyles.currency + ' mt-1 mb-1'}>
          <p className="text text_type_digits-default pr-2">{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredientsStyles.cardTitle + " text text_type_main-default"}>{props.name}</p>
      </div>
}

Card.propTypes = {  
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

const TypeCards = ({data, type}) => {  
  return <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {data.map(dataElement => {
      if (dataElement.type === type) {
        return <Card {...dataElement} key={dataElement._id}/>
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

const BurgerIngredients = props => {  
  return (
    <section className={burgerIngredientsStyles.section + ' mr-10'}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
     <TabSet/>
     <div className={burgerIngredientsStyles.scrollSection}>
        <h2 className='text text_type_main-medium mb-6'>Булки</h2>
        <TypeCards data={props.data} type='bun'/>        
       <h2 className='text text_type_main-medium mb-6 mt-10'>Соусы</h2>
        <TypeCards data={props.data} type='main'/>
       <h2 className='text text_type_main-medium mb-6 mt-10'>Начинки</h2>
        <TypeCards data={props.data} type='sauce'/>
      </div>
      
    </section>
  );  
}

BurgerIngredients.propTypes = {
  data: PropTypes.object.isRequired
}

export default BurgerIngredients;