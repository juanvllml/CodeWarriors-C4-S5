import React, { useEffect, useState, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_PROJECT_BY_ID } from "../../graphql/Projects/queries"
import { UPDATE_PROJECT_LEADER } from "../../graphql/Projects/mutations"

import Swal from 'sweetalert2';

const ProjectRegister = () => {
    
    const { id } = useParams();
    const _id = id;

    const { loading, error, data } = useQuery(GET_PROJECT_BY_ID, { variables: { _id: id } });
    const [state, setState] = useState({})

    useEffect(() => {
        if(loading === false && data){
            let datos = data.projectById
            setState(datos);
        }
    }, [loading, data])

    const onChangeHandler = e => {
        const { name, value } = e.target;        
        if (name === "budget"){
            setState(prevState => ({
                ...prevState,
                [name]: parseInt(value)
            }));
        }else{
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
        }
        if (mutationError) {
            Toast.fire({
                position: 'top-end',
                title: 'Error actualizando',
                icon: 'error',
                showConfirmButton: false,
            })
        }
    }, [mutationError, mutationData]);

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
            // variables: { _id, campos: { ...state } },
            variables: { _id, campos: { ...datos } },
        });
    }

    return (
        <>
            <div className="container mt-4">
                <center><h1>Editar Proyecto</h1></center>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre Proyecto</span>
                        </div>
                        <input
                            type="text"
                            name="project_name"
                            className="form-control"
                            aria-label="Nombre Proyecto"
                            aria-describedby="inputGroup-sizing-default"
                            defaultValue={state.project_name}
                            onChange={(e)=>onChangeHandler(e)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Objetivo general</span>
                        </div>
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

                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Objetivos específicos</span>
                        </div>
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

                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Presupuesto</span>
                        </div>
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
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={SubmitForm}
                        >
                            Guardar
                        </button>                        
                    </div>

                <div className="text-center mt-5">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={()=>{
                                console.log(state)
                            }}
                        >
                            check state
                        </button>                        
                </div>

            </div>
        </>
    )

}

export default ProjectRegister