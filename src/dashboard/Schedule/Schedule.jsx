import React, { useState, useEffect } from 'react';
import classes from './Schedule.module.css';
import axios from 'axios';
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Schedule = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    let [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/schedules')
            .then(result => {
                const schedulesData = result.data;
                setSchedules(schedulesData);
            });

     if (history.location.state && history.location.state.message) {
            addToast(history.location.state.message.text, { appearance: history.location.state.message.appearance, autoDismiss: true, autoDismissTimeout: 3000 });
            history.replace({});
        }
    }, [addToast, history]);

    let scheduleElements = schedules.map(schedule => {
        return (
            <tr key={schedule.id}>
                <td>{schedule.title}</td>
                <td>{schedule.description}</td>
                <td className={classes.pos}>{schedule.price}</td>
                <td className={classes.pos}>{schedule.max_count_members}</td>
                <td className={classes.pos}>{moment.utc(schedule.start_date).format('LT')} {moment.utc(schedule.start_date).format('L')}</td>
                <td className={classes.pos}>{moment.utc(schedule.end_date).format('LT')} {moment.utc(schedule.end_date).format('L')}</td>
                <td className={classes.update}>
                    <button className={classes.btn}>
                        <img src="https://img.icons8.com/cotton/2x/edit.png" alt="true" />
                    </button>
                    <button onClick={() => handleRemove(schedule.id)} className={classes.btn}>
                        <img src="https://img.icons8.com/cotton/2x/delete-sign--v2.png" alt="true" />
                    </button>
                </td>
            </tr>
        );
    })


        scheduleElements.sort();
    function handleRemove(id) {
        axios.delete('http://127.0.0.1:8001/api/schedule/' + id)
            .then(result => {
                let findMasterId = schedules.filter((schedule) => schedule.id !== id);
                setSchedules(findMasterId);
                addToast('Дані успішно видалені', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 6000 });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
            });
    }
    
    return (
        <div className={classes.fluid}>
            <span className={classes.title}>Розклад</span>

            <Link to="/dashboard/schedule/create">
                <button className={classes.createBtn} title="Створюй швидше">
                    <img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/add_blue.png" alt="true" />
                </button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Опис майстер-класу</th>
                        <th>Ціна</th>
                        <th>Учасники</th>
                        <th>Початок</th>
                        <th>Кінець</th>
                        <th>Зміни</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleElements}
                </tbody>
            </table>
        
        </div>
 
    );
}

export default Schedule;