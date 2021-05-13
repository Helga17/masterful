import React, { useState, useEffect } from 'react';
import classes from './CreateSchedule.module.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import "react-datepicker/dist/react-datepicker.css";

const CreateSchedule = () => {
    let [title, setTitle] = useState('');
    let [price, setPrice] = useState('');
    let [masterId, setMasterId] = useState(0);
    let [text, setText] = useState('');
    let [countMembers, setCountMembers] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { addToast } = useToasts();
    const history = useHistory();

    let [masters, setMasters] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/masters')
            .then(result => {
                const mastersData = result.data;
                setMasters(mastersData);
            });
    }, []);

    let masterElements = masters.map(master => {
        return (
            <option value={master.id} key={master.id} >{master.name}</option>
        );
    })

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCountMembersChange = (event) => {
        setCountMembers(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleMasterChange = (event) => {
        setMasterId(event.target.value);
    };

    const onSubmit = () => {
        let formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('start_date', startDate.toISOString());
        formData.append('end_date', endDate.toISOString());
        formData.append('description', text);
        formData.append('max_count_members', countMembers);
        formData.append('master_id', masterId);

        axios.post('http://127.0.0.1:8001/api/schedules', formData, {
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            }
        })
            .then(result => {
                history.push("/dashboard/schedules", { 'message': { 'appearance': 'success', 'text': 'Дані успішно додані' } });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
            });
    }

    return (

        <div className={classes.content}>
            <p>Створити розклад подій</p>
            <div className={classes.formGroup}>
                <p className={classes.label}>Назва</p>
                <div className={classes.col}>
                    <input type="text" name="title" onChange={(event) => handleTitleChange(event)} required="required" placeholder="Enter the title" />
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Дата та час початку</p>
                <div className={classes.col}>
                    <DatePicker selected={startDate} onChange={date => setStartDate(date)} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Дата та час кінця</p>
                <div className={classes.col}>
                    <DatePicker selected={endDate} onChange={date => setEndDate(date)} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" />
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Максимальна кількість місць</p>
                <div className={classes.col}>
                    <input type="number" name="members" onChange={(event) => handleCountMembersChange(event)} required="required" placeholder="Enter count members" />
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Вартість</p>
                <div className={classes.col}>
                    <input type="number" name="members" onChange={(event) => handlePriceChange(event)} required="required" placeholder="Enter price" />
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Обрати майстера</p>
                <div className={classes.col}>
                    <select onChange={(event) => handleMasterChange(event)}>
                        {masterElements}
                    </select>
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Опис творчості</p>
                <div className={classes.col}>
                    <textarea name="text" id="" cols="30" rows="10" onChange={(event) => handleTextChange(event)} placeholder="Enter the text for post"></textarea>
                </div>
            </div>
            <div className={classes.formGroup}>
                <div className={classes.col}>
                    <input onClick={() => onSubmit()} type="submit" value="Submit" />
                </div>
            </div>
        </div>

    );
}

export default CreateSchedule;