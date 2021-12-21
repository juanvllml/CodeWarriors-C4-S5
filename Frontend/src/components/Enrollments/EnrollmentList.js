import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ENROLLMENTS_BY_PROJECT } from "../../graphql/Enrollments/queries"
import { GET_PROJECT_BY_ID } from "../../graphql/Projects/queries"
import { GET_Users } from '../../graphql/Users/queries';
import { UPDATE_ENROLLMENT_STATUS } from "../../graphql/Enrollments/mutations"
import { Loading } from '../Loading';
import Swal from 'sweetalert2';
import { useUser } from '../../context/userContext';

import { EstadoInscripcion } from '../../utils/enums';

const EnrollmentList = () => {
    const { userData } = useUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({})
    const { loading : lod, error: errors, data: users } = useQuery(GET_Users);
    const { loading: load, error: err, data: project } = useQuery(GET_PROJECT_BY_ID, { variables: { _id: id } });
    const { loading, error, data } = useQuery(GET_ENROLLMENTS_BY_PROJECT, { variables: { project_id: id } });
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (lod === false && users) {
            let datos = users.allUsers
            setState(datos);
        }
    }, [lod, users])

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    // Update Student
    const [updateEnrollment, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_ENROLLMENT_STATUS);

    const handleStatus = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        const campos = {
            enrollment_status : value
        }
        if(value === 'ACEPTADA' ){
            campos['admission_date'] = new Date()
        }else if(value === 'RECHAZADA'){
            campos['egress_date'] = new Date()

        }
        updateEnrollment({
            variables: { _id, campos: campos},
        });
    };

    const findUser = (_id) =>{
        const element = state;
        let index = element.findIndex(x => x._id === _id);
        if((index >= 0 && id !== '') ){
            return element[index].full_name;
        }
        return '';
    }

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
            navigate('/enrollments/project/'+id);
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
        <div className="container">
            {
                loader ?
                    <div className="loading d-flex align-items-center justify-content-center">
                        <Loading />
                    </div>
                    :
                    !error ?
                        <div className="row mt-3">
                            <h2>Inscripciones del proyecto {project?.projectById?.project_name}</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/projects-leader/"+userData._id}>Lista de proyectos </Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Inscripciones</li>
                                </ol>
                            </nav>
                            <hr/>
                            <div className="row mt-4">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Estudiante</th>
                                                <th>Fecha Ingreso</th>
                                                <th>Fecha Egreso</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.enrollmentsByProject.map((element, index) => (
                                                <tr key={element.enrollment_id}>
                                                    <td>{findUser(element.student_id)}</td>
                                                    <td>{element.admission_date}</td>
                                                    <td>{element.egress_date}</td>
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
                            </div>
                        </div>
                        :
                        <p>{error.message}</p>
            }
        </div>
    )
}

export default EnrollmentList