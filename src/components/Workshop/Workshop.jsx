import axios from 'axios';
import React, { useEffect, useState } from 'react';
import classes from './Workshop.module.css';

const Workshop = (props) => {

    const [workshops, setWorkshops] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/workshops')
            .then(result => {
                const workshopsData = result.data;
                setWorkshops(workshopsData);
            });
    }, []);

    let workshopElements = workshops ? workshops.map(workshop => {
        const imageLink = `http://127.0.0.1:8001/${workshop.image}`;
        return (

            <div className={classes.card} key={workshop.id} >
                <div className={classes.image}>
                    <img src={imageLink} alt="" />
                </div>

                <div className={classes.details}>
                    <p className={classes.title}>{workshop.title}</p>
                    <p className={classes.description}>{workshop.description}</p>
                </div>
            </div>
        );
    }) : [];

    return (
        <section className={classes.section}>
            <div className={classes.container}>

                <p className={classes.text}>Різновиди творчої діяльності</p>
                <div className={classes.cards}>
                    <div className={classes.row}>

                        {workshopElements}
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Workshop;