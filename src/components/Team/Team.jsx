import React, { useEffect, useState } from 'react';
import classes from './Team.module.css';
import axios from 'axios';


const Team = (props) => {
    let [masters, setMasters] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/masters')
            .then(result => {
                const mastersData = result.data;
                setMasters(mastersData);
            });
    }, []);

    let masterElements = masters ? masters.slice(0, 4).map(master => {
        const imageLink = `http://127.0.0.1:8001/${master.image}`;
        return (
            <div key={master.id} className={classes.item}>
                <div className={classes.img}>
                    <img className={classes.img} src={imageLink} alt="" />
                </div>
                <div className={classes.info}>
                    <div className={classes.name}>{master.name}</div>
                    <div className={classes.prof}>{master.profession}</div>
                </div>
            </div> 
        );
    }) : [];

    return (
        <section className={classes.section}>
            <div className={classes.container}>
                <div className={classes.title}>Наші творчі майстрині</div>
                <div className={classes.team}>

                    {masterElements}

                </div>
            </div>
        </section>
    );
}

export default Team;