import React, { useState } from 'react';
import classes from './CreatePost.module.css';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import "react-datepicker/dist/react-datepicker.css";

const CreatePost = () => {
    let [title, setTitle] = useState('');
    let [text, setText] = useState('');
    let [image, setImage] = useState(null);
    let [errors, setErrors] = useState({
        title: false,
        text: false,
        image: false
    });
    const [startDate, setStartDate] = useState(new Date());
    const { addToast } = useToasts();
    const history = useHistory();

    const handleTitleChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.title = true;
        } else {
            clonedErrors.title = false;
        }
        setErrors(clonedErrors);
        setTitle(event.target.value);
    };

    const handleTextChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
    
        if (!event.target.value ) {
            clonedErrors.text = true;
        } else {
            clonedErrors.text = false;
        }
        setErrors(clonedErrors);
        setText(event.target.value);
    };

    const uploadFile = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.image = true;
        } else {
            clonedErrors.image = false;
        }
        setErrors(clonedErrors);
        setImage(event.target.files[0]);
    }

    const onSubmit = () => {

        if (!isFormValid()) {
            return;
        }

        let formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('start_date', startDate.toISOString());
        formData.append('text', text);

        axios.post('http://127.0.0.1:8001/api/posts', formData, {
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            }
        })
            .then(result => {
                history.push("/dashboard/posts", { 'message': { 'appearance': 'success', 'text': 'Дані успішно добавленi' } });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2500 });
            });
    }

    const isFormValid = () => {
        let isValid = true;
        let errorsData = {}

        if (!title) {
            errorsData.title = true;
            isValid = false;
        }

        if (!text) {
            errorsData.text = true;
            isValid = false;
        }

        if (!image) {
            errorsData.image = true;
            isValid = false;
        }

        setErrors(errorsData);
        return isValid;
    }

    return (
        <div>
            <div className={classes.content}>
                <p>Створити новий пост</p>
                <div className={classes.formGroup}>
                    <p className={classes.label}>Назва</p>
                    <div className={classes.col}>
                        <input type="text" style={errors.title ? {borderColor: "red"} : {}} name="title" onChange={(event) => handleTitleChange(event)} required="required" placeholder="Enter the title" />
                        {errors.title && <p>Errors</p>}
                    </div>
                </div>
                <div className={classes.formGroup}>
                    <p className={classes.label}>День події</p>
                    <div className={classes.col}>
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)}  showTimeSelect  dateFormat="MMMM d, yyyy h:mm aa"   />
                    </div>
                </div>
                <div className={classes.formGroup}>
                    <p className={classes.label}>Текст</p>
                    <div className={classes.col}>
                        <textarea name="text" style={errors.text ? {borderColor: "red"} : {}} id="" cols="30" rows="10" onChange={(event) => handleTextChange(event)} placeholder="Enter the text for post"></textarea>
                        {errors.text && <p>Errors</p>}
                    </div>
                </div>
                <div className={classes.formGroup}>
                    <p className={classes.label}>Зображення</p>
                    <div className={classes.col}>
                        <input type="file" style={errors.image ? {borderColor: "red"} : {}} onChange={(event) => uploadFile(event)} name="image" accept="image/png, image/jpeg, image/jpg" />
                        {errors.image && <p>Errors</p>}
                    </div>
                </div>
                <div className={classes.formGroup}>
                    <div className={classes.col}>
                        <input onClick={() => onSubmit()} type="submit" value="Submit" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;