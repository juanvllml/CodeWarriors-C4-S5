import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PROJECTS_BY_LEADER } from "../../graphql/Projects/queries";
import { Loading } from '../Loading';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const ProjectLeader = (props) => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECTS_BY_LEADER, { variables: { leader_cc: id } });
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

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
                            <h2>Lista de Proyectos
                                <Link to={`/projects/register`}>
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
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>id</th>
                                                <th>Nombre</th>
                                                <th>Lider</th>
                                                <th>Estado</th>
                                                <th>Fase</th>
                                                <th>Inscripciones</th>
                                                <th>Avances</th>
                                                <th>Editar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.projectByLeader.map((element, index) => (
                                                <tr key={element._id}>
                                                    <td>{element.project_id}</td>
                                                    <td>{element.project_name}</td>
                                                    <td>{element.leader_name}</td>
                                                    <td>{element.project_status}</td>
                                                    <td>{element.project_stage}</td>
                                                    <td>
                                                        <Link to={`/enrollments/project/${element._id}`}>
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                            >
                                                                Inscripciones
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/advances/${element._id}`}>
                                                            <button
                                                                className="btn btn-warning btn-sm"
                                                            >
                                                                Avances
                                                            </button>
                                                        </Link>
                                                    </td>
                                                    {element.project_status === 'ACTIVO' ?
                                                        <td>
                                                            <Link to={`/projects/update/${element._id}`}>
                                                                <button
                                                                    className="btn btn-warning btn-sm"
                                                                >
                                                                    Editar
                                                                </button>
                                                            </Link>
                                                        </td> : null}

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

export default ProjectLeader
