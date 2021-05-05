import React from 'react';
import Ticket from '../Ticket/Ticket';
import classes from './TestUser.module.css';


const TestUser = (props) => {
    

    return(
        <section className={classes.section}>
            <div className={classes.container}>
                <p>Квитки на майстер-класи</p>
                <Ticket />
            </div> 
        </section>
       
    );
}

export default TestUser;