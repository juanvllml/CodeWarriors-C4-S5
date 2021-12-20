import React, { useEffect } from 'react';
import { Loading } from '../Loading';
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
    const [updateStudent, { data: mutationData, error: mutationError }] =
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
    }, [mutationError, mutationData,Toast]);


    return (
        <div className="container">
            {
                loading ?
                    <div className="loading d-flex align-items-center justify-content-center">
                        <Loading />
                    </div>
                    :
                    !error ?
                        <div className="row mt-3">
                            <h2>Lista de Estudiantes</h2>
                            <div className="row mt-4">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Nombre</th>
                                                <th>CC</th>
                                                <th>Email</th>
                                                <th>User Type</th>
                                                <th>Status</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.usersByType.map((element, index) => (
                                                <tr key={element._id}>
                                                    <td>{element.full_name}</td>
                                                    <td>{element.cc}</td>
                                                    <td>{element.email}</td>
                                                    <td>{element.user_type}</td>
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
                            </div>
                        </div>
                        :
                        <p>{error.message}</p>
            }
        </div>
    )
}

export default StudentList