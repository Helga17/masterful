import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Register.module.css';
import axios from 'axios';

const Register = (props) => {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [errors, setErrors] = useState([]);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        const isValidEmail = validateEmail(event.target.value);

        if (!isValidEmail && event.target.value.length > 0) {
            errors['email'] = 'Not valid email.';
        } else {
            errors['email'] = '';
        }
    }
 
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

   const onSubmit = (event) => {
    // event.preventDefault();

    axios.post('http://127.0.0.1:8001/api/register', { name: username, email: email, password: password, password_confirmation: confirmPassword })
        .then(result => {
            if (result.data.user) {
                props.setUser(result.data.user)
                localStorage.setItem('passport', result.data.access_token);
            }
            if (result.error) {
                errors['email'] = 'not';
                // result.error.email
            }

            console.log(result);
            // props.setUser(result.data.user);
            localStorage.setItem('passport', result.data.access_token);
            // window.location.href = '/';
        });
   }

   const validatePassword = () => {
    if (confirmPassword !== password) {
        errors['confirmPassword'] = 'not valid passw';
    } else {
        errors['confirmPassword'] = '';
    }
    setErrors(errors);
}

    return (
        <div className={classes.section}>
            <div className={classes.box}>
                <img src="/auth.png" alt="" />
            </div>
            <div className={classes.content}>
                <div className={classes.form}>
                    <h2>Зареєструватися</h2>
                        <div className={classes.inputBox}>
                            <span>Ім'я</span>
                            <input type="text" name="name" onChange={(event) => handleUsernameChange(event)} />
                        </div>
                        <div className={classes.inputBox}>
                            <span>Пошта</span>
                            <input type="email" name="email" onChange={(event) => handleEmailChange(event)} />
                            <div><p>{errors['email']}</p></div>
                        </div>
                        <div className={classes.inputBox}>
                            <span>Пароль</span>
                            <input type="password" name="password" onChange={(event) => handlePasswordChange(event)}/>
                        </div>
                        <div className={classes.inputBox}>
                            <span>Повторний пароль</span>
                            <input type="password"  name="password_confirmation" onChange={(event) => handleConfirmPasswordChange(event)} onBlur={validatePassword}/>
                        </div>
                        <div className={classes.inputBox}>
                            <input value="Далі" type="submit" onClick={(event) => onSubmit(event)}/>
                        </div>
                        <div>
                            <p>Ви вже маєте акаунт? <Link to="/login">Авторизуватися</Link></p> 
                        </div>
                </div>
            </div>

        </div>
    )
}

export default Register;