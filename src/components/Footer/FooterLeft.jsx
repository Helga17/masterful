import React from 'react';
import classes from './FooterLeft.module.css';

const FooterLeft = (props) => {
    return (
        <div className={classes.col}>
            <div className={classes.logo}>Masterful</div>
            <div className={classes.text}>
                Masterful - це майстерня, яка надихає. Люди просто пізнають себе,
                відкривають нові можливості свого "Я" та насолоджуються проведеним
                часом за робою від самого себе.<br></br>
                Masterful - це перш за все любов та натхнення.
            </div>
        </div>    
    );
}

export default FooterLeft;