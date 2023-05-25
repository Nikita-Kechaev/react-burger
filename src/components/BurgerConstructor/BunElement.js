import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';



export const BunElement = ({ type, text}) => {

    const bun = useSelector(store => store.constructorArr.bun)

    return (
        bun &&
        <ConstructorElement
            type={type}
            isLocked={true}
            text={`${bun.name} (${text})`}
            price={`${bun.price}`}
            thumbnail={`${bun.image_mobile}`}
        />
    )
}

BunElement.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}