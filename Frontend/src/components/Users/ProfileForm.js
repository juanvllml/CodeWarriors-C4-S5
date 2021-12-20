import React, { useEffect, useState } from "react";
import { Roles } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { Loading } from '../Loading';
import { UPDATE_USER } from '../../graphql/Users/mutations';
import {useUser} from '../../context/userContext';

function ProfileForm() {
  const { userData } = useUser();
  const navigate = useNavigate();
  const loading = false, error = false;
  const [loader, setLoader] = useState(true);
  const [register, setRegister] = useState({
    full_name: "",
    cc: "",
    email: "",
    user_type: "",
    status: "PENDIENTE"
  })
  const [createUser, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_USER);

  const handleRegister = async (e) => {
    e.preventDefault();
    const _id = register._id;
    delete register._id;
    createUser({
      variables: {_id, campos: { ...register } },
    });
  };

  useEffect(()=>{
    setRegister({...userData})
  },[userData])

  useEffect(() => {
    setLoader(loading);
    setLoader(mutationLoading);
  }, [loading, mutationLoading]);

  useEffect(() => {
    if (mutationData) {
      Swal.fire({
        title: 'Edición exitosa!',
        icon: 'success',
        showConfirmButton: false,
      });
    }
    if (mutationError) {
      Swal.fire({
        title: 'Error editando usuario',
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }, [mutationError, mutationData, navigate]);

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
              <h2>Editar Perfil</h2>
              <div className="row mt-4">
                <form onSubmit={handleRegister}>
                  <div className="form-outline mb-2">
                    <label className="form-label">Nombres completos</label>
                    <input type="text" className="form-control" name="full_name"
                      defaultValue={register.full_name}
                      onChange={(e) => setRegister({ ...register, full_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label">Número de documento</label>
                    <input type="text" className="form-control" name="cc"
                      defaultValue={register.cc}
                      onChange={(e) => setRegister({ ...register, cc: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label">Correo electrónico</label>
                    <input type="text" className="form-control" name="email"
                      defaultValue={register.email}
                      onChange={(e) => setRegister({ ...register, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label">Perfil</label>
                    <select className="form-select"
                      defaultValue={register.user_type}
                      onChange={(e) => setRegister({ ...register, user_type: e.target.value })}
                      required
                    >
                      <option key="0" value="">Selecciona</option>
                      {
                        Object.keys(Roles).map(estado => {
                          return <option key={estado} value={estado}>{Roles[estado]}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="text-center pt-1 mb-2 pb-1">
                    <button className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3">Editar</button>
                  </div>
                </form>
              </div>
            </div>
            :
            <></>
      }
    </div>
  );
}

export default ProfileForm