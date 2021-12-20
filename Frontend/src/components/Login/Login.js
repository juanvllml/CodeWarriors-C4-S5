import React, { useEffect, useState }  from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../graphql/Users/mutations';
import AuthSide from '../../layouts/AuthSide';
import { useAuth } from '../../context/authContext';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [logIn, setLogIn] = useState({
    email: "",
    password: ""
  })

  // falta captura de error de la mutacion
  const [login, { data: dataMutation, loading: mutationLoading }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: { email: logIn.email, password : logIn.password },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }else {
        Swal.fire({
          title: (dataMutation.login.error && dataMutation.login.error != '')? dataMutation.login.error : 'Error login',
          icon: 'error',
          showConfirmButton: false,
      })
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <>
      <div className="col-xl-12">
        <div className="app-content">
          <AuthSide />
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <div className="card-body p-md-5 mx-md-4 ">
              <div className="text-center">
                <h4 className="mt-1 mb-5 pb-1">Login</h4>
              </div>
              <form onSubmit={submitForm}>
                <div className="form-outline mb-4">
                  <label className="form-label">Correo</label>
                  <input type="email"  className="form-control"
                  defaultValue={logIn.email}
                  onChange={(e) => setLogIn({ ...logIn, email: e.target.value })}
                  required
                  />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control"
                  defaultValue={logIn.password}
                  onChange={(e) => setLogIn({ ...logIn, password: e.target.value })}
                  required
                  />
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3">Log in</button>
                </div>

                <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">No tienes una cuenta?</p>
                  <Link  to="/auth/register">
                    <button type="button" className="btn btn-outline-danger">Registrar</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login