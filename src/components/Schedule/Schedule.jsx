import React, { useEffect, useState } from 'react';
import classes from './Schedule.module.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/uk'
import { useToasts } from 'react-toast-notifications';

const Schedule = (props) => {
    let [schedules, setSchedules] = useState([]);
    let [schedulesStore, setSchedulesStore] = useState([]);
    let [scheduleDates, setScheduleDates] = useState([]);
    let [activeIndexTab, setActiveIndexTab] = useState(3);
    const { addToast } = useToasts();

    const [user] = useState(JSON.parse(sessionStorage.getItem('user')));
    const token = localStorage.getItem('passport') || '';

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/schedules', config)
            .then(result => {
                const scheduleData = result.data;
                const dates = scheduleData.map((schedule) => {
                    return moment(schedule.start_date).format("DD MMMM");
                }).filter((elem, pos, arr) => {
                    return arr.indexOf(elem) === pos;
                }).slice(0, 5);

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
            <div className={classes.date}
                style={style}
                key={index}
                onClick={() => handleChangeActiveTabIndex(index)}
            >
                <span>{date}</span>
            </div>
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
        const isDisabled = schedule.current_count_members >= schedule.max_count_members;
        const button = !schedule.is_assigned
            ? <button className={classes.join} disabled={isDisabled} onClick={() => handleJoin(schedule.id)}>Записатися</button>
            : <button className={classes.left} onClick={() => handleRemoveJoin(schedule.id)}>Відписатися</button>;

        return (
            <div className={classes.inside} key={schedule.id}>
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
                        <p>Кількість учасників: {schedule.current_count_members} / {schedule.max_count_members} </p>
                        <p>Вартість: {schedule.price} грн</p>
                    </div>
                    <div className={classes.btn}>
                        {button}
                    </div>
                </div>
            </div>
        );
    });

    // scheduleElements.sort();

    const handleJoin = (id) => {
        if (!user) {
            return addToast('Для того щоб записатися на майстер-клас, Вам потрібно авторизуватися у системі', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
        }

        axios.post(`http://127.0.0.1:8001/api/schedules/${id}/assign`, {}, config)
            .then(result => {
                const clonedSchedules = [...schedules];
                let schedule = clonedSchedules.find(schedule => schedule.id === id);
                schedule.is_assigned = true;
                schedule.current_count_members += 1;
                setSchedules(clonedSchedules);
            });
    }

    const handleRemoveJoin = (id) => {
        if (!user) {
            return addToast('Для того щоб записатися на майстер-клас, Вам потрібно авторизуватися у системі', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
        }

        axios.post(`http://127.0.0.1:8001/api/schedules/${id}/unassign`, {}, config)
            .then(result => {
                const clonedSchedules = [...schedules];
                let schedule = clonedSchedules.find(schedule => schedule.id === id);
                schedule.is_assigned = false;
                schedule.current_count_members -= 1;
                setSchedules(clonedSchedules);
            });
    }

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
