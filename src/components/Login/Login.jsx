import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { useToasts } from 'react-toast-notifications';

const Login = (props) => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { addToast } = useToasts();

    let [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const handleEmailChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.email = true;
        } else {
            clonedErrors.email = false;
        }
        setErrors(clonedErrors);
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.password = true;
        } else {
            clonedErrors.password = false;
        }
        setErrors(clonedErrors);
        setPassword(event.target.value);
    }

    const isFormValid = () => {
        let isValid = true;
        let errorsData = {};

        if (!email) {
            errorsData.name = true;
            isValid = false;
        }

        if (!password) {
            errorsData.profession = true;
            isValid = false;
        }

        setErrors(errorsData);

        return isValid;
    }

    const onSubmit = (event) => {
        
        event.preventDefault();
        axios.post('http://127.0.0.1:8001/api/login', { email: email, password: password })
            .then(result => {
                if (result.data.message) {
                    addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
                }
                console.log(result, 'login');
                props.setUser(result.data.user);
                localStorage.setItem('passport', result.data.access_token);

                // return <Redirect to={"/"} />
                window.location.href = '/';
            });

        if (!isFormValid()) {
            return;
        }
    }


    return (
        <div className={classes.section}>
            <div className={classes.box}>
                <img src="/auth.png" alt="" />
            </div>
            <div className={classes.content}>
                <div className={classes.form}>
                    <h2>Увійти до системи</h2>
                  
                        <div className={classes.inputBox}>
                            <span>Пошта</span>
                            <input type="email" style={errors.email ? { borderColor: "red" } : {}} name="" onChange={(event) => handleEmailChange(event)} required="required" />
                            {errors.email && <p>Errors</p>}
                        </div>
                        <div className={classes.inputBox}>
                            <span>Пароль</span>
                            <input type="password" style={errors} name="" onChange={(event) => handlePasswordChange(event)} />
                            {errors.setPassword && <p>Errors</p>}
                        </div>
                        <div className={classes.inputBox}>
                            <input value="Увійти" type="submit" onClick={(event) => onSubmit(event)} />
                        </div>
                        <div>
                            <p>У вас не має акаунту? <Link to="/register">Заєреструватися</Link></p>
                        </div>

                </div>
            </div>

        </div>
    );
}

export default Login;
