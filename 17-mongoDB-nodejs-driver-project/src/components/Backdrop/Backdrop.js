import React from 'react';

import './Backdrop.css'

const backdrop = props => <div className={props.show ? 'backdrop show' : 'backdrop'} />;

export default backdrop;