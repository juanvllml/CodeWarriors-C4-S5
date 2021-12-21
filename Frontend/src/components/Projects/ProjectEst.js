import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
// import { gql, useQuery } from "@apollo/client";
import Swal from 'sweetalert2';
import { GET_Projects } from '../../graphql/Projects/queries';
import { GET_ENROLLMENTS } from '../../graphql/Enrollments/queries';
import { Loading } from '../Loading';
import { EstadoProyecto, FaseProyecto, } from '../../utils/enums';
import { CREATE_ENROLLMENT } from '../../graphql/Enrollments/mutations';
import { useUser } from '../../context/userContext';


const ProjectEst = () => {
    const { userData } = useUser();
    const [loader, setLoader] = useState(true)
    const [enrollments, setEnrollments] = useState({})
    const { loading: load, error: errr, data: enroll } = useQuery(GET_ENROLLMENTS);
    const { loading, error, data } = useQuery(GET_Projects);
    const [createEnrollment, { data: enrollData, loading: enrollLoading, error: enrollError }] =
        useMutation(CREATE_ENROLLMENT);

    const handleInscribir = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        console.log('change', _id, value);
        createEnrollment({
            variables: { campos: { project_id : _id, student_id : userData._id,
                enrollment_status : "PENDIENTE"} },
        });
    };

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    useEffect(() => {
        if (load === false && enroll) {
            let datos = enroll.enrollments
            setEnrollments(datos);
        }
    }, [load, enroll])

    const findEnrollment = (project_id) => {
        let is_enroll = true;
        let is_advance = false;
        const element = enrollments;
        if(element){
            element.forEach((item, index) => {
                if (item.project_id === project_id) {
                    if ((index >= 0 && project_id !== '')) {
                        if (is_enroll && item.student_id == userData._id) {
                            is_enroll = false;
                        }
                        if (!is_advance && item.student_id == userData._id && item.enrollment_status === 'ACEPTADA') {
                            is_advance = true;
                        }
                    }
                }
            });
        }

        return {
            enroll: is_enroll,
            advance: is_advance,
        };
    }

    useEffect(() => {
        if (enrollData) {
            Swal.fire({
                title: 'Inscripcion exitosa!',
                icon: 'success',
                showConfirmButton: false,
            })
            window.location.reload(false);
        }
        if (enrollError) {
            Swal.fire({
                title: 'Error en inscripción',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [enrollError, enrollData]);

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
                            <h2>Lista de Proyectos</h2>
                            <div className="row mt-4">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Leader</th>
                                                <th>Estado</th>
                                                <th>Fase</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.allProjects.map(({ _id, project_id, project_name, leader_name, project_status, project_stage }) => {
                                                const options = findEnrollment(_id);
                                                return <tr key={_id}>
                                                    <td>{project_id}</td>
                                                    <td>{project_name}</td>
                                                    <td>{leader_name}</td>
                                                    <td>
                                                        {EstadoProyecto[project_status]}
                                                    </td>
                                                    <td>
                                                        {FaseProyecto[project_stage]}
                                                    </td>
                                                    <td>
                                                        {
                                                            project_status === 'ACTIVO' && options.enroll ? (
                                                                <button type="button" className="btn btn-success" onClick={e => handleInscribir(e, _id)}>
                                                                    <span className="ps-2">Incribirme</span>
                                                                </button>)
                                                                : <></>
                                                        }
                                                        {
                                                            (options.advance) ?
                                                                <Link className="btn btn-warning" to={`/advances/${_id}`}>
                                                                    <span className="ps-2">Avances</span>
                                                                </Link>
                                                                : <></>
                                                        }
                                                    </td>
                                                </tr>
                                            }
                                            )}
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

export default ProjectEst;
