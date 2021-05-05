import React from 'react';
import classes from './Footer.module.css';
import FooterCenter from './FooterCenter';
import FooterRight from './FooterRight';
import FooterLeft from './FooterLeft'

const Footer = (props) => {
    return (
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.inner}>
        
                    <FooterLeft />
                    <FooterCenter />
                    <FooterRight />
                </div>
            </div>
        </footer>
    );
}

export default Footer;