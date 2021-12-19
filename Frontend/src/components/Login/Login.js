import React from "react";
import { Link } from "react-router-dom";
import AuthSide from '../../layouts/AuthSide';


function Login() {
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
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label">Correo</label>
                  <input type="email"  className="form-control" />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" for="form2Example22">Password</label>
                  <input type="password" id="form2Example22" className="form-control" />
                </div>

                <div className="text-center pt-1 mb-5 pb-1">
                  <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button">Log in</button>
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