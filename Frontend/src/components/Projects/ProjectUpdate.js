import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_PROJECT_BY_ID } from "../../graphql/Projects/queries"
import { UPDATE_PROJECT_LEADER } from "../../graphql/Projects/mutations"
import { Loading } from '../Loading';
import { useUser } from '../../context/userContext';
import Swal from 'sweetalert2';

const ProjectUpdate = () => {
    const { userData } = useUser();
    const navigate = useNavigate();
    const { id } = useParams();
    const _id = id;
    const [loader, setLoader] = useState(true);
    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, { variables: { _id: id } });
    const [state, setState] = useState({})

    useEffect(() => {
        if (loading === false && data) {
            let datos = data.projectById
            setState(datos);
        }
    }, [loading, data])

    const onChangeHandler = e => {
        const { name, value } = e.target;
        if (name === "budget") {
            setState(prevState => ({
                ...prevState,
                [name]: parseInt(value)
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Update Project
    const [updateProject, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(UPDATE_PROJECT_LEADER);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });

    useEffect(() => {
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Proyecto actualizado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
            navigate('/projects-leader/' + state.leader_cc);
        }
        if (mutationError) {
            Toast.fire({
                position: 'top-end',
                title: 'Error actualizando',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [mutationError, mutationData]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setLoader(mutationLoading);
    }, [mutationLoading]);

    const SubmitForm = (e) => {
        console.log(state)
        e.preventDefault();

        let datos = {
            "project_name": state.project_name,
            "general_objectives": state.general_objectives,
            "specific_objectives": state.specific_objectives,
            "budget": state.budget
        }

        updateProject({
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
                            <h2>Editar Proyecto {state.project_name}</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to={"/projects-leader/"+userData._id}>Lista de proyectos </Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Editar proyecto</li>
                                </ol>
                            </nav>
                            <hr/>
                            <div className="row mt-4">
                                <form
                                    onSubmit={SubmitForm}
                                    className='flex flex-col items-center justify-center'
                                >
                                    <div className="form-outline mb-2">
                                        <label className="form-label">Nombre proyecto </label>
                                        <input
                                            type="text"
                                            name="project_name"
                                            className="form-control"
                                            aria-label="Nombre Proyecto"
                                            aria-describedby="inputGroup-sizing-default"
                                            defaultValue={state.project_name}
                                            onChange={(e) => onChangeHandler(e)}
                                        />
                                    </div>
                                    <div className="form-outline mb-2">
                                        <label className="form-label">Objetivos Generales</label>
                                        <textarea
                                            className="form-control"
                                            name="general_objectives"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            defaultValue={state.general_objectives}
                                            onChange={onChangeHandler}
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label">Objetivos Especificos</label>
                                        <textarea
                                            className="form-control"
                                            name="specific_objectives"
                                            id="exampleFormControlTextarea1"
                                            rows="3"
                                            defaultValue={state.specific_objectives}
                                            onChange={onChangeHandler}
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-outline mb-2">
                                        <label className="form-label">Presupuestos</label>
                                        <input
                                            type="number"
                                            name="budget"
                                            className="form-control"
                                            aria-label="Presupuesto"
                                            aria-describedby="inputGroup-sizing-default"
                                            defaultValue={state.budget}
                                            onChange={onChangeHandler}
                                        />
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

export default ProjectUpdate