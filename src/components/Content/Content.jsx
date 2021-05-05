import React from 'react';
import classes from './Content.module.css';

const Content = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.workshop}>
                <div className={classes.item}>
                    <div className={classes.title}>Фешн ілюстрації</div>
                    <p className={classes.desc}>Майстер-клас fashion ілюстрації – це справжній жіночий рай, де можна 
                    згадати дитинство, в якому кожна дівчинка створювала одяг для своєї улюбленої ляльки. Тільки 
                    тепер дівчата виросли та створюють модні образи вже для себе. Тут можна на сто відсотків 
                    віддатися власній фантазії та створити абсолютно казковий образ або ж підійти до процесу 
                    прагматично та намалювати ідеальний діловий костюм.</p>
                    <p className={classes.desc}>В фешн ілюстрації основне — показати образ, стиль, характер, настрій. 
                    Візуальна схожість відходить на другий план.</p>
                </div>
                <div className={classes.item}>
                    <div className={classes.img}>
                        <img src="https://i.pinimg.com/originals/52/d7/8b/52d78b422b192338c74ca7696e8a6b4d.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;