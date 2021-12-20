import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { GET_Projects } from '../../graphql/Projects/queries';
import { Loading } from '../Loading';
import { EstadoProyecto, FaseProyecto, } from '../../utils/enums';
import { UPDATE_PROJECT } from '../../graphql/Projects/mutations';


const ProjectList = () => {
    const [loader, setLoader] = useState(true)
    const { loading, error, data } = useQuery(GET_Projects);
    const [updateUser, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_PROJECT);

    const handleStatusProject = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        console.log('change', _id, value);
        updateUser({
            variables: { _id, campos: { project_status: value } },
        });
    };

    const handleStageProject = async (e, _id) => {
        e.preventDefault();
        const { target: { value } } = e;
        console.log('change', _id, value);
        updateUser({
            variables: { _id, campos: { project_stage: value } },
        });
    };

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    useEffect(() => {
        if (mutationData) {
            Swal.fire({
                title: 'Proyecto editado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
        }
        if (mutationError) {
            Swal.fire({
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
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {data.allProjects.map(({ _id, project_id, project_name, leader_name, project_status, project_stage }) => (
                                                <tr key={_id}>
                                                    <td>{project_id}</td>
                                                    <td>{project_name}</td>
                                                    <td>{leader_name}</td>
                                                    <td>
                                                        <select className="form-select"
                                                            value={project_status}
                                                            onChange={e => handleStatusProject(e, _id)}
                                                        >
                                                            {
                                                                Object.keys(EstadoProyecto).map(estado => {
                                                                    return <option key={estado} value={estado}>{EstadoProyecto[estado]}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </td><td>
                                                        <select className="form-select"
                                                            value={project_stage}
                                                            onChange={e => handleStageProject(e, _id)}
                                                        >
                                                            {
                                                                Object.keys(FaseProyecto).map(fase => {
                                                                    return <option key={fase} value={fase}>{FaseProyecto[fase]}</option>
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

export default ProjectList;
