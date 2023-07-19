import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { DELTE_ITEM_FROM_CONSTRUCTOR } from '../../services/constant'
import styles from './BurgerConstructor.module.css';
import { useDrag ,useDrop } from "react-dnd";
import { useDispatch } from '../../utils/hooks';
import { useRef, FC } from 'react';
import { TMainElementProps } from "../../utils/types"

export const MainElement: FC<TMainElementProps> = ({ id, item, index, moveCard }) => {

    const dispatch = useDispatch();
    const onDelete = (item:any) => {
        dispatch({
            type: DELTE_ITEM_FROM_CONSTRUCTOR,
            item
        })
    }

    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop({
        accept: 'item',
        collect(monitor) {
        return {
            handlerId: monitor.getHandlerId(),
        }
        },
        hover(item:any, monitor) {
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
        const clientOffset:any = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
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
        type: 'item',
        item: () => {
        return { id, index }
        },
        collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    drag(drop(ref))
    return (
        <div ref={ref} data-handler-id={handlerId} className={`${styles.middleIngridients} pt-4 pb-4 pr-8 pl-8`} style={{ opacity }}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => onDelete(item)}
            />
        </div>
    )
}