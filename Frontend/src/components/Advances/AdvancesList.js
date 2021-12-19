import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ADVANCES_BY_PROJECT } from "../../graphql/Advances/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons'



const AdvancesList = (props) => {

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_ADVANCES_BY_PROJECT, { variables: { project_id: id } });

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <h2>Lista de Avances proyecto {id}
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
                    </h2>
                    <div className="row mt-4">

                        {!loading ?
                            <div className="table-responsive">
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>_id</th>
                                            <th>project_id</th>
                                            <th>Avance</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.advancesByProject.map((element, index) => (
                                            <tr key={`p-${index}`}>
                                                <td>{element._id}</td>
                                                <td>{element.project_id}</td>
                                                <td>
                                                    {element.advance_description}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvancesList
