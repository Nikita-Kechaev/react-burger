import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';
import { FC } from 'react';
import { RootState } from "../../utils/types"


type IBunElementProps = {
    type: "top"|"bottom";
    text: string;
}

export const BunElement: FC<IBunElementProps> = ({ type, text}) => {

    const bun = useSelector((store: RootState) => store.constructorArr.bun)

    return (
        bun &&
        <ConstructorElement
            type={type}
            isLocked={true}
            text={`${bun.name} (${text})`}
            price={bun.price}
            thumbnail={bun.image_mobile}
        />
    )
}