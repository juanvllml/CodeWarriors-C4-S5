import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ENROLLMENTS } from "../../graphql/Enrollments/queries"
import { UPDATE_ENROLLMENT_STATUS } from "../../graphql/Enrollments/mutations"

import Swal from 'sweetalert2';

import { EstadoInscripcion } from '../../utils/enums';

const EnrollmentList = () => {   

    // Get Students
    const { loading, error, data } = useQuery(GET_ENROLLMENTS);

    console.log(data)

    // Update Student
    const [updateEnrollment, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_ENROLLMENT_STATUS);

    const handleStatus = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        updateEnrollment({
            variables: { _id, campos: { enrollment_status: value } },
        });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-center",
        showConfirmButton: false,
        timer: 4000
    });

    useEffect(() => {
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Inscripcion editada exitosamente!',
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
                <center><h1>Inscripciones</h1></center>
                
                {!loading ?
                <div className="table-responsive">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Enrollment Id</th>
                                <th>Project ID</th>
                                <th>Student ID</th>                                
                                <th>admission_date</th>
                                <th>egress_date</th>
                                <th>Enrollment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.enrollments.map((element, index) => (
                                <tr key={`p-${index}`}>
                                    <td>{element._id}</td>
                                    <td>{element.enrollment_id}</td>
                                    <td>{element.project_id}</td>
                                    <td>{element.student_id}</td>
                                    <td>{element.admission_date}</td>
                                    <td>{element.egress_date}</td>
                                    {/* <td>{enrollment_status}</td>*/}
                                    <td>
                                    <select className="form-select"
                                            value={element.enrollment_status}
                                            onChange={e => handleStatus(e, element._id)}
                                        >
                                            {
                                                Object.keys(EstadoInscripcion).map(estado => {
                                                    return <option key={estado} value={estado}>{EstadoInscripcion[estado]}</option>
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

export default EnrollmentList