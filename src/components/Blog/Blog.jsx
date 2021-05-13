import React, { useEffect, useState } from 'react';
import classes from './Blog.module.css';
import axios from 'axios';
import moment from 'moment';

const Blog = () => {
    let [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8001/api/posts')
            .then(result => {
                const postsData = result.data;
                setPosts(postsData);
            });
    }, []);

    let blogElements = posts.map(post => {
        const imageLink = `http://127.0.0.1:8001/${post.image}`;
        return (
            <article className={classes.item} key={post.id}>
                <div className={classes.img}>
                    <img src={imageLink} alt="" />
                </div>
                <div className={classes.details}>
                    <div className={classes.info}>
                        <h3>{post.title}</h3>
                        <p>{post.text}</p>
                    </div>
                    <div className={classes.created}>
                        Masterful  -  {moment(post.created_at).format("ll")}
                    </div>
                </div>
            </article>
        );
    });

    return (
        <div className={classes.bg}>
            <div className={classes.container}>
                <div className={classes.blog}>

                    <div className={classes.title}>Блог майстерні</div>

                    <div className={classes.content}>
                        <div className={classes.posts}>
                            {blogElements}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Blog;