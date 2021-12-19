import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useUser } from '../context/userContext';
import PrivateComponent from '../components/PrivateComponent';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faFolder, faUserCheck } from '@fortawesome/free-solid-svg-icons'

library.add(faHome, faUser, faUsers, faFolder, faUserCheck);

const SidebarLinks = () => (
    <ul className="SidebarList nav">
        <SidebarRouteImagen to='/profile' title='Perfil' icon='user' />
        <SidebarRoute to='' title='Inicio' icon='home' />
        <PrivateComponent roleList={['ADMINISTRADOR']}>
            <SidebarRoute to='/users' title='Usuarios' icon='users' />
        </PrivateComponent>
        <SidebarRoute to='/projects' title='Proyectos' icon='folder' />
        <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
            <SidebarRoute
                to='/inscripciones'
                title='Aprobacion Inscripciones'
                icon='user-check'
            />
        </PrivateComponent>
    </ul>
);

const Logout = () => {
    const { setToken } = useAuth();
    const deleteToken = () => {
        setToken(null);
    };
    return (
        <NavLink to='/auth/login' className='row-item d-flex p-2 align-items-center'>
            <button type='button' className='btn btn-danger d-flex align-items-center' onClick={() => deleteToken()}>
                <div className='flex items-center'>
                    <i className='fas fa-sign-out-alt' />
                    <span className='text-sm  ml-2'>Cerrar Sesión</span>
                </div>
            </button>
        </NavLink>
    );
};

const Logo = () => (
    <>
        <div className="container d-flex flex-column pt-4 text-center">
            <small className="mt-2"><strong>Bienvenido</strong><br />
                user
                <br />
                user
            </small>
        </div>
        <hr />
    </>
);

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    return (
        <div className="Sidebar text-white bg-dark">
            {/* Sidebar starts */}
            <nav className="">
                <Logo />
                <SidebarLinks />
            </nav>
            {/* Sidebar ends */}
        </div>
    );
};

const SidebarRoute = ({ to, title, icon }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            isActive
                ? 'row-item d-flex p-2 align-items-center row-active'
                : 'row-item d-flex p-2 align-items-center'
        }
    >
        <FontAwesomeIcon
            color="white"
            size="1x"
            className="icon"
            icon={icon} />
        <div className="title">{title}</div>
    </NavLink>
);
const SidebarRouteImagen = ({ to, title, icon }) => {
    const { userData } = useUser();
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive
                    ? 'row-item d-flex p-2 align-items-center row-active'
                    : 'row-item d-flex p-2 align-items-center'
            }
        >
            <FontAwesomeIcon
                color="white"
                size="1x"
                className="icon" icon={icon} />
            <div className="title">{title}</div>
        </NavLink>
    );
};


export default Sidebar;