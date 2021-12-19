import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

// Graphql
import { useQuery, useMutation } from '@apollo/react-hooks';
import { POST_PROJECT } from "../../graphql/Projects/mutations"

import Swal from 'sweetalert2';

import { EstadoProyecto, FaseProyecto } from '../../utils/enums';

const AdvanceForm = () => {

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
        project_stage: ""
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
        if (mutationData) {
            Toast.fire({
                position: 'top-end',
                title: 'Proyecto creado exitosamente!',
                icon: 'success',
                showConfirmButton: false,
            })
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
        createProject({
            variables: { campos: { ...state } },
        });
    }

    return (
        <>
            <div className="container mt-4">
                <center><h1>Registrar Avance</h1></center>
                <form
                    onSubmit={SubmitForm}
                    className='flex flex-col items-center justify-center'
                >

                    <div className="input-group mb-3">
                        <div className="input-group-prepend col-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Avance</span>
                        </div>
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

                    <div className="text-center mt-5 mb-5">
                        <button className="btn btn-primary">
                            Guardar
                        </button>
                    </div>

                </form>


                {/* <div className="text-center mt-5">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={()=>{
                                console.log(state)
                            }}
                        >
                            check state
                        </button>
                </div> */}

            </div>
        </>
    )

}

export default AdvanceForm