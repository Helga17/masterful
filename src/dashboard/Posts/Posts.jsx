import React, { useEffect, useState } from 'react';
import classes from './Posts.module.css';
import axios from 'axios';
import moment from 'moment';
import { useParams, Link, useHistory } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

const Posts = (props) => {
    const history = useHistory();
    const { addToast } = useToasts();
    let [posts, setPosts] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/posts')
            .then(result => {
                const postsData = result.data;
                setPosts(postsData);
            });

        if (history.location.state && history.location.state.message) {
            addToast(history.location.state.message.text, { appearance: history.location.state.message.appearance, autoDismiss: true, autoDismissTimeout: 3000 });
            history.replace({});
        }
    }, [addToast, history]);


    let postElements = posts ? posts.map(post => {
        const imageLink = `http://127.0.0.1:8001/${post.image}`;

        return (
            <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.text}</td>
                <td>{moment(post.created_at).format('L')}</td>
                <td><img className={classes.img} src={imageLink} alt="" /></td>
                <td>
                    <button className={classes.btn}>
                        <img src="https://img.icons8.com/cotton/2x/edit.png" alt="true" />
                    </button>
                    <button className={classes.btn} onClick={() => handleRemove(post.id)}>
                        <img src="https://img.icons8.com/cotton/2x/delete-sign--v2.png" alt="true" />
                    </button>
                </td>
            </tr>
        );
    }) : [];


    function handleRemove(id) {
        axios.delete('http://127.0.0.1:8001/api/post/' + id)
            .then(result => {
                let findPostId = posts.filter((post) => post.id !== id);
                setPosts(findPostId);
                addToast('Дані успішно видалені', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000 });
            }).catch((error) => {
                addToast('Щось пішло не так', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 2500 });
            });

    }

    return (
        <div className={classes.fluid}>
            <span className={classes.title}>Пости</span>

            <Link to="/dashboard/post/create">
                <button className={classes.createBtn} title="Створюй швидше">
                    <img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/add_blue.png" alt="true" />
                </button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th className={classes.col1}>Title</th>
                        <th className={classes.col2}>Text</th>
                        <th className={classes.col3}>Created</th>
                        <th className={classes.col4}>Image</th>
                        <th className={classes.col5}>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {postElements}
                </tbody>

            </table>
        </div>


    );
}

export default Posts;