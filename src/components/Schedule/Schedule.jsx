import React, { useEffect, useState } from 'react';
import classes from './Schedule.module.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/uk'

const Schedule = (props) => {
    let [schedules, setSchedules] = useState([]);
    let [schedulesStore, setSchedulesStore] = useState([]);
    let [scheduleDates, setScheduleDates] = useState([]);
    let [activeIndexTab, setActiveIndexTab] = useState(3);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/schedules')
            .then(result => {
                const scheduleData = result.data;
                const dates = scheduleData.map((schedule) => {
                    return moment(schedule.start_date).format("DD MMMM");
                }).filter((elem, pos, arr) => {
                    return arr.indexOf(elem) === pos;
                }).slice(0,5);

                const activeStartDate = dates[activeIndexTab];

                const filteredSchedules = scheduleData.filter((schedule, index, array) => {
                    return activeStartDate === moment(schedule.start_date).format("DD MMMM");
                });

                setSchedules(filteredSchedules);
                setSchedulesStore(scheduleData);
                setScheduleDates(dates);
            });
    }, []);

    let dateElements = scheduleDates.map((date, index) => {
        const style = index === activeIndexTab ? { backgroundColor: "#6b75ff", color: "#fff" } : {};
        return (
            <div className={classes.date} style={style} key={index} onClick={() => handleChangeActiveTabIndex(index)} ><span>{date}</span></div>
        );


    });

    function handleChangeActiveTabIndex(index) {
        setActiveIndexTab(index);
        const activeStartDate = scheduleDates[index];

        const filteredSchedules = schedulesStore.filter(schedule => {
            return activeStartDate === moment(schedule.start_date).format("DD MMMM");
        });

        setSchedules(filteredSchedules);
    }

    let scheduleElements = schedules.map(schedule => {
        return (
            // <div className={classes.card} key={schedule.id}>
            //     <div className={classes.header}>
            //         <p className={classes.time}>{schedule.time}</p>
            //         <p>{schedule.title}</p>
            //         <p>Кількість місць {schedule.max_count_members}</p>
            //         <p>Кошторис {schedule.price}</p>

            //         {/* {schedule.isActive ? (<span className={classes.arrowUp} onClick={() => handleClick(schedule.id)}></span>) : (<span className={classes.arrowDown} onClick={() => handleClick(schedule.id)}></span>)} */}
            //     </div>
            //     <div className={classes.example}>

            //         {/* {schedule.isActive && (<div className={classes.show}> */}
            //             {schedule.description}
            //             <br />
            //             <button className={classes.join}>Записатися</button>
            //         {/* </div>)} */}
            //     </div>
            // </div>

            <div className={classes.inside}  key={schedule.id}>
                <div className={classes.item} >
                    <div className={classes.time}>
                        <p>{moment(schedule.start_date).format('LT')}</p>
                        <p>{moment(schedule.end_date).format('LT')}</p>
                    </div>
                    <div className={classes.info}>
                        <p className={classes.sect}>{schedule.title}</p>
                        <p className={classes.description}>{schedule.description}</p>
                    </div>
                    <div className={classes.prices}>
                        <p>Кількість учасників: {schedule.max_count_members}</p>
                        <p>Вартість: {schedule.price} грн</p>
                    </div>
                    <div className={classes.btn}>
                    <button className={classes.join}>Записатися</button>
                    </div>
                </div>
            </div>
        );
    });

    scheduleElements.sort();
    

    // function handleClick(id) {
    //     const clonedSchedules = [...schedules];
    //     let schedule = clonedSchedules.find(schedule => id === schedule.id);
    //     schedule.isActive = !schedule.isActive; // true => false | false => true

    //     setSchedules(clonedSchedules);
    // }

    return (

        <section className={classes.section}>
            <div className={classes.container}>
                <div className={classes.title}>Майстер класи</div>
                <div className={classes.accordion}>

                    <div className={classes.inner}>
                        {dateElements}
                    </div>
                </div>

                <div className={classes.content}>
                    {scheduleElements}
                </div>

            </div>
        </section>
    );
}

export default Schedule;
