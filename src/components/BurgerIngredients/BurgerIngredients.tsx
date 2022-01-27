import React from 'react';
import {useState} from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { dataImport } from '../../utils/data.js'

function TabSet() {
  const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </div>
    ) 
}

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

const BunCards = ({dataImport}) => (
  <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {dataImport.map(data => {
      if (data.type === 'bun') {
        return <Card card={data}/> 
      }      
    })}
  </div> 
)

const MainCards = ({dataImport}) => (
  <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {dataImport.map(data => {
      if (data.type === 'main') {
        return <Card card={data}/> 
      }      
    })}
  </div> 
)

const SauceCards = ({dataImport}) => (
  <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
    {dataImport.map(data => {
      if (data.type === 'sauce') {
        return <Card card={data}/> 
      }      
    })}
  </div> 
)

class BurgerIngredients extends React.Component {
  state = { dataImport}
  render() {    
    return (
      <section className={burgerIngredientsStyles.section + ' mr-10'}>
        <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

        {/* <TabSet/> */}

        <div className={burgerIngredientsStyles.scrollSection}>
          <h2 className='text text_type_main-medium mb-6'>Булки</h2>
          <BunCards dataImport={this.state.dataImport}/>        

          <h2 className='text text_type_main-medium mb-6 mt-10'>Соусы</h2>
          <SauceCards dataImport={this.state.dataImport}/>

          <h2 className='text text_type_main-medium mb-6 mt-10'>Начинки</h2>
          <MainCards dataImport={this.state.dataImport}/>
        </div>
        
      </section>
    );
  }
}

export default BurgerIngredients;