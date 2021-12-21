import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_ADVANCE } from "../../graphql/Advances/mutations"
import { GET_ADVANCE_BY_ID } from '../../graphql/Advances/queries'
import { Loading } from '../Loading';

import Swal from 'sweetalert2';

const AdvanceUpdate = (params) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const _id = id;
    const [loader, setLoader] = useState(true);
    const { loading, error, data } = useQuery(GET_ADVANCE_BY_ID, { variables: { _id: id } });
    const [state, setState] = useState({
        advance_description: "",
        leader_observations: ""
    })

    const [updateAdvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_ADVANCE);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });

    useEffect(() => {
        if (loading === false && data) {
            let datos = data.advancesById
            setState(datos);
        }
        setLoader(loading);
    }, [loading, data])

    useEffect(() => {
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Observación agregada exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
            navigate('/advances/' + state.project_id);
        }
        if (mutationError) {
            Toast.fire({
                position: 'top-end',
                title: 'Error creando',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [mutationError, mutationData]);

    const SubmitForm = (e) => {
        console.log(state)
        e.preventDefault();
        let datos = {
            "advance_description": state.advance_description
        }
        updateAdvance({
            variables: { _id, campos: { ...datos } },
        });
    }

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
                            <h2>Avances proyecto</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/advances/"+state.project_id}>Lista de Avances </Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Editar Avance</li>
                                </ol>
                            </nav>
                            <hr/>
                            <div className="row mt-4">
                                <form
                                    onSubmit={SubmitForm}
                                    className='flex flex-col items-center justify-center'
                                >
                                    <div className="form-outline mb-2">
                                        <label className="form-label">Avances </label>
                                        <textarea
                                            className="form-control"
                                            name="advance_description"
                                            rows="3"
                                            defaultValue={state.advance_description}
                                            onChange={(e) => setState({ ...state, advance_description: e.target.value })}
                                            required
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label className="form-label">Observaciones </label>
                                        <textarea
                                            className="form-control"
                                            name="advance_description"
                                            rows="3"
                                            defaultValue={state.leader_observations}
                                            readOnly
                                        >
                                        </textarea>
                                    </div>

                                    <div className="text-center mt-5 mb-5">
                                        <button className="btn btn-primary">
                                            Guardar
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                        :
                        <></>
            }
        </div>
    )

}

export default AdvanceUpdate