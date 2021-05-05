import React from 'react';
import classes from './SideBar.module.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className={classes.sidebarMenu}>
            <div className={classes.sidebarLink}>
                <Link to="/dashboard/posts">Пости у блозі</Link>
            </div>
            <div className={classes.sidebarLink}>
                <Link to="/dashboard/masters">Майстрині</Link>
            </div>
            <div className={classes.sidebarLink}>
                <Link to="/dashboard/schedules">Розклад майстер-класів</Link>
            </div>
            <div className={classes.sidebarLink}>
                <Link to="">4</Link>
            </div>
        </div>
    );
}

export default SideBar