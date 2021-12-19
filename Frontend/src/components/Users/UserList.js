import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql, useQuery } from "@apollo/client";
import Swal from 'sweetalert2';
import { GET_Users } from '../../graphql/Users/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Loading } from '../Loading';
import { EstadoUsuario } from '../../utils/enums';
import { UPDATE_USER } from '../../graphql/Users/mutations';

const UserList = () => {
    const [loader, setLoader] = useState(true)
    const { loading, error, data } = useQuery(GET_Users);
    const [updateUser, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_USER);

    const handleStatusUser = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        console.log('change', _id, value);
        updateUser({
            variables: { _id, campos: { status: value } },
        });
    };

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    useEffect(() => {
        if (mutationData) {
            Swal.fire({
                title: 'Usuario editado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
        }
        if (mutationError) {
            Swal.fire({
                title: 'Error editado',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [mutationError, mutationData]);

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <h2>Lista de Usuarios
                        <Link to={`/productos/create-`}>
                            <button
                                className="btn btn-success float-end"
                            >
                                <FontAwesomeIcon
                                    size="1x"
                                    className="icon"
                                    icon={faPlus} />
                                <span className="ps-2">Nuevo</span>
                            </button>
                        </Link>
                    </h2>
                    <div className="row mt-4">
                        {
                            loader ?
                                <div className="loading d-flex align-items-center justify-content-center">
                                    <Loading />
                                </div>
                                :
                                !error ?
                                    <>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Identificación</th>
                                                        <th>Email</th>
                                                        <th>Rol</th>
                                                        <th>Estado</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.allUsers.map(({ _id, full_name, cc, email, user_type, status }) => (
                                                        <tr key={_id}>
                                                            <td>{full_name}</td>
                                                            <td>{cc}</td>
                                                            <td>{email}</td>
                                                            <td>{user_type}</td>
                                                            <td>
                                                                <select className="form-select"
                                                                    value={status}
                                                                    onChange={e => handleStatusUser(e, _id)}
                                                                >
                                                                    {
                                                                        Object.keys(EstadoUsuario).map(estado => {
                                                                            return <option key={estado} value={estado}>{estado}</option>
                                                                        })
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td className="text-center">
                                                                <Link className="btn btn-outline-warning btn-sm" to={`/users/${_id}`}>
                                                                    <FontAwesomeIcon
                                                                        size="1x"
                                                                        className="icon"
                                                                        icon={faEdit} />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                    :
                                    <p>{error.message}</p>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserList;
