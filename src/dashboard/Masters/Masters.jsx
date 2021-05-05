import React, { useState, useEffect } from 'react';
import classes from './Masters.module.css';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Masters = () => {
    let [masters, setMasters] = useState([]);
    const { addToast } = useToasts();
    const history = useHistory();

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/masters')
            .then(result => {
                const mastersData = result.data;
                setMasters(mastersData);
            });


        if (history.location.state && history.location.state.message) {
            addToast(history.location.state.message.text, { appearance: history.location.state.message.appearance, autoDismiss: true, autoDismissTimeout: 3000 });
            history.replace({});
        }
    }, [addToast, history]);

    let masterElements = masters ? masters.map(master => {
        const imageLink = `http://127.0.0.1:8001/${master.image}`;
        return (
            <tr key={master.id}>
                <td>{master.name}</td>
                <td>{master.profession}</td>
                <td><img className={classes.img} src={imageLink} alt="" /></td>
                <td>
                    <button className={classes.btn}>
                        <img src="https://img.icons8.com/cotton/2x/edit.png" alt="true" />
                    </button>
                    <button onClick={() => handleRemove(master.id)} className={classes.btn} >
                        <img src="https://img.icons8.com/cotton/2x/delete-sign--v2.png" alt="true" />
                    </button>
                </td>
            </tr>
        );
    }) : [];

    function handleRemove(id) {
        axios.delete('http://127.0.0.1:8001/api/master/' + id)
            .then(result => {
                let findMasterId = masters.filter((master) => master.id !== id);
                setMasters(findMasterId);
                addToast('Дані успішно видалені', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
            });
    }

    return (
        <div className={classes.fluid}>
            <span className={classes.title}>Майстри</span>

            <Link to="/dashboard/master/create">
                <button className={classes.createBtn} title="Створюй швидше">
                    <img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/add_blue.png" alt="true" />
                </button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>Ім'я</th>
                        <th>Різновид діяльності</th>
                        <th>Зображення</th>
                        <th>Оновлення</th>
                    </tr>
                </thead>
                <tbody>
                    {masterElements}
                </tbody>
            </table>
        </div>

    )
}

export default Masters;