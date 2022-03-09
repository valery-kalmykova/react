import React, { useRef } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemProp } from '../../utils/constants';
import { useDrop, useDrag } from "react-dnd";
import type { XYCoord, Identifier } from 'dnd-core';

interface CurrentnotBunElementProps {
  dataElement: menuItemProp,
  onClickdelete: () => void,  
  id: string,  
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void,
}
interface DragItem {
  index: number   
  id: string
  type: string
}

const CurrentNotBunElement = ({dataElement, onClickdelete, id, index, moveCard}: CurrentnotBunElementProps): JSX.Element | null => {
 
  const ref = useRef<HTMLLIElement>(null)
  const [{ handlerId}, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? .5 : 1
  drag(drop(ref))    
  
  return <li className={burgerConstructorStyles.constructorElement} ref={ref} data-handler-id={handlerId} style={{ opacity }}>
    <DragIcon type="primary" />
    <ConstructorElement    
      text={dataElement.name}
      price={dataElement.price}
      thumbnail={dataElement.image}    
      handleClose={onClickdelete}  
    />
  </li>
 
}

export default CurrentNotBunElement;