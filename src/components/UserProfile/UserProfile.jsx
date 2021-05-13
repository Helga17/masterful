import React from 'react';
import Ticket from '../Ticket/Ticket';
import classes from './UserProfile.module.css';


const UserProfile = (props) => {
    
    return(
        <section className={classes.section}>
            <div className={classes.container}>
                <p className={classes.title}>Квитки на майстер-класи</p>
                <Ticket />
            </div> 
        </section>
       
    );
}

export default UserProfile;