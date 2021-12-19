import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_PROJECTS_BY_LEADER } from "../../graphql/Projects/queries";


const ProjectList = (props) => {

    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECTS_BY_LEADER, { variables: { leader_cc: id } });

    return (
        <>
            <div className="container mt-4">
                <center><h1>Proyectos del lider CC: {id}</h1></center>

                {!loading ?
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>_id</th>
                                    <th>project_id</th>
                                    <th>project_name</th>
                                    {/* <th>general_objectives</th>
                                <th>specific_objectives</th> */}
                                    {/* <th>budget</th> */}
                                    {/* <th>start_date</th> */}
                                    {/* <th>end_date</th> */}
                                    <th>leader_name</th>
                                    <th>leader_cc</th>
                                    <th>project_status</th>
                                    {/* <th>project_stage</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {data.projectByLeader.map((element, index) => (
                                    <tr key={`p-${index}`}>
                                        <td>{element._id}</td>
                                        <td>{element.project_id}</td>
                                        <td>{element.project_name}</td>
                                        {/* <td>{element.general_objectives}</td> */}
                                        {/* <td>{element.specific_objectives}</td> */}
                                        {/* <td>{element.budget}</td> */}
                                        {/* <td>{element.start_date}</td> */}
                                        {/* <td>{element.end_date}</td> */}
                                        <td>{element.leader_name}</td>
                                        <td>{element.leader_cc}</td>
                                        <td>{element.project_status}</td>
                                        {/* <td>{element.project_stage}</td> */}

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
                    : null}
            </div>
        </>
    )
}

export default ProjectList
