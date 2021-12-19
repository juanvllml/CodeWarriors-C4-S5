import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_STUDENTS } from "../../graphql/Users/queries"
import { UPDATE_USER } from "../../graphql/Users/mutations"

import Swal from 'sweetalert2';

import { EstadoUsuario } from '../../utils/enums';


const StudentList = () => {

    // Get Students
    const { loading, error, data } = useQuery(GET_STUDENTS, { variables: { user_type: "ESTUDIANTE" } });

    // Update Student
    const [updateStudent, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_USER);

    const handleStatusStudent = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        updateStudent({
            variables: { _id, campos: { status: value } },
        });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });

    useEffect(() => {
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Estudiante editado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
        }
        if (mutationError) {
            Toast.fire({
                position: 'top-end',
                title: 'Error editando',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [mutationError, mutationData]);


    return (
        <>
            <div className="container mt-4">
                <center><h1>Estudiantes registrados</h1></center>
                
                {!loading ?
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nombre</th>
                                <th>CC</th>
                                <th>Email</th>
                                <th>User Type</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.usersByType.map((element, index) => (
                                <tr key={`p-${index}`}>
                                    <td>{element._id}</td>
                                    <td>{element.full_name}</td>
                                    <td>{element.cc}</td>
                                    <td>{element.email}</td>
                                    <td>{element.user_type}</td>
                                    {/* <td>{element.status}</td> */}
                                    <td>
                                    <select className="form-select"
                                            value={element.status}
                                            onChange={e => handleStatusStudent(e, element._id)}
                                        >
                                            {
                                                Object.keys(EstadoUsuario).map(estado => {
                                                    return <option key={estado} value={estado}>{EstadoUsuario[estado]}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                : null}

            </div>
        </>
    )
}

export default StudentList