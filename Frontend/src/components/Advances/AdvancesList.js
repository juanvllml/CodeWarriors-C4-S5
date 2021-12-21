import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ADVANCES_BY_PROJECT } from "../../graphql/Advances/queries";
import { GET_PROJECT_BY_ID } from "../../graphql/Projects/queries"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '../../context/userContext';
import { Loading } from '../Loading';



const AdvancesList = (props) => {
    const { userData } = useUser();
    const { id } = useParams();
    const [loader, setLoader] = useState(true)
    const { loading: load, error: err, data: project } = useQuery(GET_PROJECT_BY_ID, { variables: { _id: id } });
    const { loading, error, data } = useQuery(GET_ADVANCES_BY_PROJECT, { variables: { project_id: id } });

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
                            <h2>Lista de Avances proyecto : {project?.projectById?.project_name}
                                {
                                    (userData.user_type === 'ESTUDIANTE') ?
                                        <Link to={`/advances/create/${id}`}>
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
                                        : <></>
                                }
                            </h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={(userData.user_type === 'ESTUDIANTE')? "/projects-est" : "projects-leader/"+id}>Lista de proyectos </Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Lista de Avances</li>
                                </ol>
                            </nav>
                            <hr/>
                            <div className="row mt-4">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Avance</th>
                                                <th>Observaciones</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.advancesByProject.map((element, index) => (
                                                <tr key={element._id}>
                                                    <td>
                                                        {element.advance_description}
                                                    </td>
                                                    <td>
                                                        {element.leader_observations}
                                                    </td>
                                                    <td>
                                                        {
                                                            (userData.user_type === 'ESTUDIANTE') ?
                                                                <Link to={`/advances/update/${element._id}`}>
                                                                    <button
                                                                        className="btn btn-warning btn-sm"
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                </Link>
                                                                : (userData.user_type === 'LIDER') ?
                                                                    <Link to={`/advances/observations/${element._id}`}>
                                                                        <button
                                                                            className="btn btn-warning btn-sm"
                                                                        >
                                                                            Observaciones
                                                                        </button>
                                                                    </Link>
                                                                    : <></>
                                                        }
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

export default AdvancesList
