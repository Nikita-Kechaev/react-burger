import React from 'react';
import PropTypes from 'prop-types';


export default function Modal (props) {
    return (
        <div>
            {props.children}
        </div>
    )
}

Modal.propTypes = {
    close: PropTypes.func.isRequired,
};