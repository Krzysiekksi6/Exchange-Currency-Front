import React from 'react';
import Icon from '../../UI/Icons/Icon'
import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <React.Fragment>
            <nav className={classes.header}>
                <div className={classes.heading}>
                    <h2>
                        <span>exchange</span>Currency
                    </h2>
                </div>
                <div className={classes.logo}>
					<span className={classes.icon}>
						<Icon />
					</span>
                </div>
            </nav>

        </React.Fragment>
    );
};

export default Navbar;
