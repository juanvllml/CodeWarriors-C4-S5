import React from "react";


function RegisterForm() {
      return (
        <div>
          <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
          {/*---- Include the above in your HEAD tag --------*/}
          <div className="sidenav">
            <div className="login-main-text">
              <h2>CodeWarriors<br /> Login Page</h2>
              <p>Login or register from here to access.</p>
            </div>
          </div>
          <div className="main">
            <div className="col-md-6 col-sm-12">
              <div className="login-form">
                <form>
                  <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="Full name" />
                  </div>

                  <div className="form-group">
                    <label>DNI Number</label>
                    <input type="number" className="form-control" placeholder="DNI Number" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Email" />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password" />
                  </div>

                  <div className="form-group">
                    <label>User type</label>
                    <select className="form-control">
                        <option value="Administrador">Administrador</option>
                        <option value="Lider">Lider</option>
                        <option value="Estudiante">Estudiante</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select className="form-control">
                        <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-black">
                      <a href="/"> Login </a>
                  </button>
                  <button type="submit" className="btn btn-secondary">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

  export default RegisterForm