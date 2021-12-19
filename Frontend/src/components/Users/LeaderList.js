import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_STUDENTS } from "../../graphql/Users/queries"
import { UPDATE_USER_STATUS } from "../../graphql/Users/mutations"

import { EstadoUsuario } from '../../utils/enums';


const LeaderList = () => {   

    // Get Leader
    const { loading, error, data } = useQuery(GET_STUDENTS, { variables: { user_type: "LIDER" } });

    return (
        <>
            <div className="container mt-4">
                <center><h1>Líderes</h1></center>
                
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
                                    <td>{element.status}</td>
                                    <td>                                    
                                        <Link to={`/projects/leader/${element.cc}`}>
                                            <button
                                                className="btn btn-success btn-sm"
                                            >
                                                Ver proyectos
                                            </button>
                                        </Link>
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

export default LeaderList