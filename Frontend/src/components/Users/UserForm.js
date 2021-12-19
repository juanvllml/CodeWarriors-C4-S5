import React, { useEffect, useState } from "react";
import AuthSide from '../../layouts/AuthSide';
import { Roles } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Swal from 'sweetalert2';
import { Loading } from '../Loading';
import { CREATE_USER } from '../../graphql/Users/mutations';

function RegisterForm() {
  const navigate = useNavigate();
  const loading = false, error = false;
  const [loader, setLoader] = useState(true);
  const [register, setRegister] = useState({
    full_name: "",
    cc: "",
    email: "",
    password: "",
    user_type: "",
    status: "PENDIENTE"
  })
  const [createUser, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREATE_USER);

  const handleRegister = async (e) => {
    e.preventDefault();
    createUser({
      variables: { campos: { ...register } },
    });
  };

  useEffect(() => {
    setLoader(loading);
    setLoader(mutationLoading);
  }, [loading, mutationLoading]);

  useEffect(() => {
    if (mutationData) {
      Swal.fire({
        title: 'Registro exito!',
        icon: 'success',
        showConfirmButton: false,
      });
      navigate('/auth/login');
    }
    if (mutationError) {
      Swal.fire({
        title: 'Error registrando usuario',
        icon: 'error',
        showConfirmButton: false,
      })
    }
  }, [mutationError, mutationData]);

  return (
    <>
      <div className="col-xl-12">
        <div className="app-content">
          {
            loader ?
            <div className="container">

              <div className="loading d-flex align-items-center justify-content-center">
                <Loading />
            </div>
              </div>
              :
              !error ?
                <>
                  <AuthSide />
                  <div className="col-lg-6 d-flex justify-content-center align-items-center">
                    <div className="card-body p-md-5 mx-md-4 ">
                      <div className="text-center">
                        <h4 className="mt-1 mb-5 pb-1">Registro</h4>
                      </div>
                      <form onSubmit={handleRegister}>
                        <div className="form-outline mb-2">
                          <label className="form-label">Nombes completos</label>
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
                          <label className="form-label">Contraseña</label>
                          <input type="password" className="form-control" name="password"
                            defaultValue={register.password}
                            onChange={(e) => setRegister({ ...register, password: e.target.value })}
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
                          <button className="btn btn-dark btn-block fa-lg gradient-custom-2 mb-3">Registarse</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
                :
                <></>
          }
        </div>
      </div>
    </>
  );
}

export default RegisterForm