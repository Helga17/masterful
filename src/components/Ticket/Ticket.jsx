import React, { useEffect, useState } from 'react';
import classes from './Ticket.module.css';
import axios from 'axios';
import moment from 'moment';

const Ticket = (props) => {
    let [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/schedules')
            .then(result => {
                const schedulesData = result.data;
                setSchedules(schedulesData);
            });
    }, []);

    let scheduleElements = schedules ? schedules.map(schedule => {

        return (
            <div key={schedule.id} className={classes.item}>
                <div className={classes.header}>
                    <img src="../../ticket.png" alt="" />
                </div>

                <div className={classes.info}>
                    <p className={classes.workshop}>{schedule.title}</p>
                    <p className={classes.master}>Майстриня {schedule.master ? schedule.master.name : ""}</p>


                    <div className={classes.detailes}>
                        <div className={classes.date}>
                            {/* day and month */}
                            {moment.utc(schedule.start_date).format("D")}<br />
                            {moment.utc(schedule.start_date).format("MMMM")}
                        </div>
                        <div className={classes.time}>
                            {/* time  */}
                            {moment.utc(schedule.start_date).format("LT")}<br /><br />
                            {moment.utc(schedule.end_date).format("LT")}
                        </div>
                        <div className={classes.cost}>
                            {schedule.price}<br />гривень
                    </div>

                    </div>

                </div>

                <div className={classes.cancel}>
                    <button className={classes.btn}>Відміна</button>
                </div>
            </div>
        );
    }) : [];

    return (
        <div className={classes.cards}>
            {/* <div> */}
            {scheduleElements}
            {/* </div> */}
        </div>
    );
}

export default Ticket;