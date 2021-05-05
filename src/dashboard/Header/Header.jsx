import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => {

      return (
            <nav className={classes.nav}>
                  <div>Masterful</div>
                  <div className={classes.right}>
                  <div className={classes.dropdown}>
                        <span><img className={classes.icon} src="https://images.vexels.com/media/users/3/196662/isolated/preview/cfaa8a7b6e16d1b50914720bee0002d5-cute-dino-side-view-by-vexels.png" alt="" /></span>
                        <div class={classes.dropdownContent}>
                            <div><NavLink to="/" className={classes.item}>Log out</NavLink></div>
                        </div>
                    </div>
                  </div>
            </nav>
      );
}

export default Header;

