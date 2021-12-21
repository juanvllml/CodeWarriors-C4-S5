import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Graphql
import { useMutation } from '@apollo/react-hooks';
import { POST_PROJECT } from "../../graphql/Projects/mutations"
import { Loading } from '../Loading';
import Swal from 'sweetalert2';
import {useUser} from '../../context/userContext';

import { EstadoProyecto, FaseProyecto } from '../../utils/enums';

const ProjectRegister = () => {
    const { userData } = useUser();
    const navigate = useNavigate();
    const loading = false, error = false;
    const [loader, setLoader] = useState(true);
    const [state, setState] = useState({
        project_id: "",
        project_name: "",
        general_objectives: "",
        specific_objectives: "",
        budget: 0,
        start_date: new Date(),
        end_date: new Date(),
        leader_name: "",
        leader_cc: "",
        project_status: "INACTIVO",
        project_stage: "INICIADO"
    })

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

    const onChangeStatus = e => {
        setState(prevState => ({
            ...prevState,
            "project_status": e.target.value
        }));
    }

    const onChangeStage = e => {
        setState(prevState => ({
            ...prevState,
            "project_stage": e.target.value
        }));
    }

    // Create Project
    const [createProject, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(POST_PROJECT);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000
    });

    useEffect(() => {
        setLoader(loading);
        setLoader(mutationLoading);
    }, [loading, mutationLoading]);

    useEffect(() => {
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Proyecto creado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
            navigate('/projects-leader/'+state.leader_cc);
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

    useEffect(() => {
        setState({ ...state, leader_name: userData.full_name, leader_cc: userData._id })
    }, [userData])

    const SubmitForm = (e) => {
        console.log(state)
        e.preventDefault();
        createProject({
            variables: { campos: { ...state } },
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
                            <h2>Crear Proyecto</h2>
                            <div className="row mt-4">
                                <form
                                    onSubmit={SubmitForm}
                                    className='flex flex-col items-center justify-center'
                                >
                                    <div className="row g-3 align-items-center">
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">ID Proyecto</label>
                                            <input
                                                type="text"
                                                name="project_id"
                                                className="form-control"
                                                aria-label="ID Proyecto"
                                                aria-describedby="inputGroup-sizing-default"
                                                defaultValue={state.project_id}
                                                onChange={(e) => onChangeHandler(e)}
                                                required
                                            />
                                        </div>
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">Nombre proyecto </label>
                                            <input
                                                type="text"
                                                name="project_name"
                                                className="form-control"
                                                aria-label="Nombre Proyecto"
                                                aria-describedby="inputGroup-sizing-default"
                                                defaultValue={state.project_name}
                                                onChange={(e) => onChangeHandler(e)}
                                                required
                                            />
                                        </div>
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
                                            required
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
                                            defaultValue={parseInt(state.budget)}
                                            onChange={onChangeHandler}
                                            required
                                        />
                                    </div>
                                    <div className="row g-3 align-items-center">
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">Fecha Inicio</label>
                                            <input
                                                type="date"
                                                name="start_date"
                                                className="form-control"
                                                aria-label="Fecha inicio"
                                                aria-describedby="inputGroup-sizing-default"
                                                defaultValue={state.start_date}
                                                onChange={onChangeHandler}
                                                required
                                            />
                                        </div>
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">Fecha Fin</label>
                                            <input
                                                type="date"
                                                name="end_date"
                                                className="form-control"
                                                aria-label="Fecha fin"
                                                aria-describedby="inputGroup-sizing-default"
                                                defaultValue={state.end_date}
                                                onChange={onChangeHandler}
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-3 align-items-center">
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">Estado</label>
                                            <select className="form-select"
                                                defaultValue={state.project_status}
                                                onChange={e => onChangeStatus(e)}
                                                required
                                            >
                                                {
                                                    Object.keys(EstadoProyecto).map(estado => {
                                                        return <option key={estado} value={estado}>{EstadoProyecto[estado]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="form-outline mb-2 col-6">
                                            <label className="form-label">Fase</label>
                                            <select className="form-select"
                                                // value={element.status}
                                                defaultValue={state.project_stage}
                                                onChange={e => onChangeStage(e)}
                                                required
                                            >
                                                {
                                                    Object.keys(FaseProyecto).map(estado => {
                                                        return <option key={estado} value={estado}>{FaseProyecto[estado]}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
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

export default ProjectRegister