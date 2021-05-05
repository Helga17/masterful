import React from 'react';
import classes from './Intro.module.css';
import Content from './../Content/Content'
import Team from './../Team/Team'
import Schedule from '../Schedule/Schedule';

const Intro = (props) => {
    return (
        <div>
            <div className={classes.intro}>
                <div className={classes.container}>
                    <div className={classes.inner}>
                        <div className={classes.header}>
                            <img src="/draw.png" alt="" />
                        </div>
                        <div className={classes.title}>
                            <h2>Світ починається з <br /> любові та мистецтва</h2>
                        </div>
                    </div>
                </div>
            </div>
            <Content />
            <Team />
            <Schedule />
        </div>
    );
}

export default Intro;