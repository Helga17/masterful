import React from 'react';
import classes from './FooterCenter.module.css';
// import { Link } from 'react-router-dom';

const FooterCenter = (props) => {
    return (
        <div className={classes.col}>
            <div className={classes.title}>Інстаграм</div>
            <div className={classes.instagram}>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="/src/inst/1.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paintclub-instructions_resize.jpg" alt={""}/>
                </div>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="/src/inst/2.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paint-club-chats_resize.jpg" alt={""}/>
                </div>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="/src/inst/3.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paintclub-instructions_resize.jpg" alt={""}/>
                </div>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="/src/inst/4.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paint-club-chats_resize.jpg" alt={""}/>
                </div>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="/src/inst/5.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paintclub-instructions_resize.jpg" alt={""}/>
                </div>
                <div className={classes.item}>
                    {/* <img className={classes.img} src="inst/6.png" alt={""} /> */}
                    <img src="https://www.cartonhouse.com/upload/slide_images/paint-club-chats_resize.jpg" alt={""}/>
                </div>
            </div>
        </div>

    );
}

export default FooterCenter;