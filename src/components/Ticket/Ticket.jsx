import React, { useEffect, useState } from 'react';
import classes from './Ticket.module.css';
import axios from 'axios';
import moment from 'moment';

const Ticket = (props) => {
    let [schedules, setSchedules] = useState([]);

    const token = localStorage.getItem('passport') || '';

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/user-schedules', config)
            .then(result => {
                const schedulesData = result.data;
                setSchedules(schedulesData);
            });
    }, []);

    const handleRemoveJoin = (id) => {
        axios.post(`http://127.0.0.1:8001/api/schedules/${id}/unassign`, {}, config)
            .then(result => {
                const clonedSchedules = [...schedules];
                let scheduleIndex = clonedSchedules.findIndex(schedule => schedule.id === id);

                clonedSchedules.splice(scheduleIndex, 1);

                setSchedules(clonedSchedules);
            });
    }

    let scheduleElements = schedules.length > 0 ? schedules.map(schedule => {
        console.log(schedules)
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
                    <button className={classes.btn} onClick={() => handleRemoveJoin(schedule.id)}>Відміна</button>
                </div>
            </div>
        );
    }) : <div className={classes.notif}><img src="/empty.png" alt=""/> <p>У вас зараз немає сеансів майстер класів</p></div>;

    return (
        <div className={classes.cards}>
            {scheduleElements}
        </div>
    );
}

export default Ticket;