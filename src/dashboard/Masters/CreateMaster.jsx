import React, { useState } from 'react';
import classes from './CreateMaster.module.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import "react-datepicker/dist/react-datepicker.css";

const CreateMaster = () => {
    let [name, setName] = useState('');
    let [profession, setProfession] = useState('');
    let [image, setImage] = useState();
    let [errors, setErrors] = useState({
        name: false,
        profession: false,
        image: false
    });
    const { addToast } = useToasts();
    const history = useHistory();

    const handleNameChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.name = true;
        } else {
            clonedErrors.name = false;
        }
        setErrors(clonedErrors);
        setName(event.target.value);
    };

    const handleProfessionChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.profession = true;
        } else {
            clonedErrors.profession = false
        }
        setErrors(clonedErrors);
        setProfession(event.target.value);
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
        formData.append('name', name);
        formData.append('image', image);
        formData.append('profession', profession);

        axios.post('http://127.0.0.1:8001/api/masters', formData, {
            validateStatus: function (status) {
                return status >= 200 && status < 300; // default
            }
        })
            .then(result => {
                history.push("/dashboard/masters", { 'message': { 'appearance': 'success', 'text': 'Дані успішно додані' } });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
            });
    }

    const isFormValid = () => {
        let isValid = true;
        let errorsData = {};

        if (!name) {
            errorsData.name = true;
            isValid = false;
        }

        if (!profession) {
            errorsData.profession = true;
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

        <div className={classes.content}>
            <p>Створити нового майстера</p>
            <div className={classes.formGroup}>
                <p className={classes.label}>Ім'я</p>
                <div className={classes.col}>
                    <input type="text" style={errors.name ? {borderColor: "red"} : {}} name="name" onChange={(event) => handleNameChange(event)} required="required" placeholder="Введіть ім'я мастера" />
                    {errors.name && <p>Відсутній запис</p>}
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Різновид діяльності</p>
                <div className={classes.col}>
                    <input type="text" style={errors.profession ? {borderColor: "red"} : {}} name="profession" onChange={(event) => handleProfessionChange(event)} required="required" placeholder="Введіть ім'я мастера" />
                    {errors.profession && <p>Відсутній запис</p>}
                </div>
            </div>
            <div className={classes.formGroup}>
                <p className={classes.label}>Зображення</p>
                <div className={classes.col}>
                    <input type="file" style={errors.image ? {borderColor: "red"} : {}} onChange={(event) => uploadFile(event)} name="image" accept="image/png, image/jpeg, image/jpg" />
                    {errors.image && <p>Відсутній запис</p>}
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

export default CreateMaster;