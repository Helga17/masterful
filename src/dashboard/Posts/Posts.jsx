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
            addToast(history.location.state.message.text, { appearance: history.location.state.message.appearance, autoDismiss: true, autoDismissTimeout: 6000 });
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
                addToast('???????? ?????????????? ????????????????', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 6000 });
            }).catch((error) => {
                addToast('???????? ?????????? ???? ??????', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 6000 });
            });

    }

    return (
        <div className={classes.fluid}>
            <span className={classes.title}>??????????</span>

            <Link to="/dashboard/post/create">
                <button className={classes.createBtn} title="?????????????? ????????????">
                    <img src="https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/add_blue.png" alt="true" />
                </button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th className={classes.col1}>??????????</th>
                        <th className={classes.col2}>???????? ??????????</th>
                        <th className={classes.col3}>???????? ????????????????????</th>
                        <th className={classes.col4}>????????????????????</th>
                        <th className={classes.col5}>??????????</th>
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