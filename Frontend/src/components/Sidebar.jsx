import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useUser } from '../context/userContext';
import PrivateComponent from '../components/PrivateComponent';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faUsers, faFolder, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import {Roles} from '../utils/enums'

library.add(faHome, faUser, faUsers, faFolder, faUserCheck);

const SidebarLinks = () => {
    const { userData } = useUser();
    return (

        <ul className="SidebarList nav">
        <SidebarRoute to='' title='Inicio' icon='home' />
        <SidebarRouteImagen to='/profile' title='Perfil' icon='user' />
        <PrivateComponent roleList={['ADMINISTRADOR']}>
            <SidebarRoute to='/users' title='Usuarios' icon='users' />
        </PrivateComponent>
        <PrivateComponent roleList={['LIDER']}>
            <SidebarRoute to='/students' title='Estudiantes' icon='users' />
        </PrivateComponent>
        <PrivateComponent roleList={['ADMINISTRADOR']}>
            <SidebarRoute to='/projects' title='Proyectos' icon='folder' />
        </PrivateComponent>
        <PrivateComponent roleList={['LIDER']}>
            <SidebarRoute to={'/projects-leader/'+userData._id} title='Proyectos' icon='folder' />
        </PrivateComponent>
        <PrivateComponent roleList={['ESTUDIANTE']}>
            <SidebarRoute to='/projects-est' title='Proyectos' icon='folder' />
        </PrivateComponent>
        {/* <PrivateComponent roleList={['LIDER']}>
            <SidebarRoute
                to='/inscripciones'
                title='Aprobacion Inscripciones'
                icon='user-check'
                />
        </PrivateComponent> */}
    </ul>
    )
};

const Logo = () => {
    const { userData } = useUser();
    return (<>
        <div className="container d-flex flex-column pt-4 text-center">
            <small className="mt-2"><strong>Bienvenido</strong><br />
                {userData.full_name}
                <br />
                {Roles[userData.user_type]}
            </small>
        </div>
        <hr />
    </>);
};

const Sidebar = () => {
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