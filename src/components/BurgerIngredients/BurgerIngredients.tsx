import React, {useState, useEffect, useRef, RefObject} from 'react';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import { CurrencyIcon, Counter, Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { menuItemProp } from '../../utils/constants'
import { useDrag } from "react-dnd";
import { useOnScreen } from './useOnScreen';
import { RootState } from '../../services/reducers';

interface CardProps {
  dataElement: menuItemProp,
  onClick: () => void,  
}

const Card: React.FC<CardProps> = ({dataElement, onClick}) => {  
  const [, dragRef] = useDrag({
    type: 'item',  
    item: dataElement,
  });

  const elInCostructor = (dataElement.__v > 0)
  
  return (
    <div className={burgerIngredientsStyles.card + ' mb-8'} onClick={onClick} ref={dragRef}>
        {elInCostructor && <Counter count={dataElement.__v} size="default" />}
        <img className={burgerIngredientsStyles.cardImage + ' mr-4 ml-4'} src={dataElement.image} alt={dataElement.name} />
        <div className={burgerIngredientsStyles.currency + ' mt-1 mb-1'}>
          <p className="text text_type_digits-default pr-2">{dataElement.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredientsStyles.cardTitle + " text text_type_main-default"}>{dataElement.name}</p>
      </div>
  ) 
}

interface TypeCardsProps {
  type: string,
  handleOpenModal: (dataElement: menuItemProp) => void,
  productData: menuItemProp[],
}


const TypeCards: React.FC<TypeCardsProps> = ({type, handleOpenModal, productData}) => {
  return (
    <div className={burgerIngredientsStyles.cards + ' ml-4 mr-2'}>
      {productData.map((dataElement) => {
        if (dataElement.type === type) {
          return <Card 
          dataElement={dataElement} 
          key={dataElement._id} 
          onClick={()=>handleOpenModal(dataElement)}
          />
        }      
      })}
    </div>
  ) 
}

interface BurgerIngredientsProps {
  handleOpenModal: (dataElement: menuItemProp) => void,  
}

const BurgerIngredients: React.FC<BurgerIngredientsProps> = ({handleOpenModal}) => {
  const dispatch = useDispatch();
  const productData = useSelector((state:RootState) => state.products.productData);
  
  const main = useRef(null) as RefObject<HTMLHeadingElement>;
  const sauce = useRef(null) as RefObject<HTMLHeadingElement>;
  const bun = useRef(null) as RefObject<HTMLHeadingElement>;
  
  const [currentTab, setCurrent] = useState('');  
  const onScreenMain = useOnScreen(main);
  const onScreensauce = useOnScreen(sauce);
  const onScreenbun = useOnScreen(bun);

  useEffect(() => {
		if (onScreenMain) {
			setCurrent('main');
    }
    else if (onScreensauce) {
			setCurrent('sauce');
		}
    else if (onScreenbun) {
			setCurrent('bun');
		}
	}, [onScreenbun, onScreensauce, onScreenMain, setCurrent]);

  const scrollTo = (ref: RefObject<HTMLHeadingElement>) => {
    ref.current && ref.current.scrollIntoView()
  }

  return (
    <section className={burgerIngredientsStyles.section + ' mr-10'}>
      <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
     
      <div style={{ display: 'flex' }} className='mb-10'>
        <Tab value="Булки" active={currentTab === 'bun'} onClick={() => scrollTo(bun)}>
          Булки
        </Tab>
        <Tab value="Соусы" active={currentTab === 'sauce'} onClick={() => scrollTo(sauce)}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={currentTab === 'main'} onClick={() => scrollTo(main)}>
          Начинки
        </Tab>
      </div>

     <div className={burgerIngredientsStyles.scrollSection} id="scrollArea">
       <h2 className='text text_type_main-medium mb-6' ref={bun}>Булки</h2>
        <TypeCards type='bun' handleOpenModal={handleOpenModal} productData={productData}/>        
       <h2 className='text text_type_main-medium mb-6 mt-10' ref={sauce}>Соусы</h2>
        <TypeCards type='sauce' handleOpenModal={handleOpenModal} productData={productData}/>
       <h2 className='text text_type_main-medium mb-6 mt-10' ref={main}>Начинки</h2>
        <TypeCards type='main' handleOpenModal={handleOpenModal} productData={productData}/>
      </div>
      
    </section>
  );  
}

export default BurgerIngredients;