import React, { useState, useEffect } from "react";
import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import jwt_decode from 'jwt-decode';

import { AuthContext } from './context/authContext'
import { UserContext } from './context/userContext'

import AuthLayout from './layouts/AuthLayout'
import PrivateLayout from './layouts/PrivateLayout'

import Dashboard from './components/Dashboard'
import Login from './components/Login/Login'
import ProfileForm from "./components/Users/ProfileForm";
import RegisterForm from "./components/Users/UserForm";
import UserList from './components/Users/UserList'
import StudentList from './components/Users/StudentList'
import ProjectList from './components/Projects/ProjectList'
import ProjectRegister from './components/Projects/ProjectRegister'
import ProjectUpdate from './components/Projects/ProjectUpdate'
import ProjectEst from './components/Projects/ProjectEst'
import AdvancesList from './components/Advances/AdvancesList'
import AdvanceForm from './components/Advances/AdvanceForm'

import EnrollmentList from './components/Enrollments/EnrollmentList';
import ProjectLeader from "./components/Projects/ProjectLeader";
import ObservationForm from "./components/Advances/ObservationForm";
import AdvanceUpdate from "./components/Advances/AdvanceUpdate";

const httpLink = createHttpLink({
  // uri: 'https://servidor-gql-mintic.herokuapp.com/graphql',
  uri: 'http://localhost:3100',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        full_name: decoded.full_name,
        cc: decoded.cc,
        email: decoded.email,
        user_type: decoded.user_type,
        status: decoded.status,
      });
    }
  }, [authToken]);

  return (
    <div className={`App d-flex`}>
      <ApolloProvider client={client}>

      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route exact path="" element={<Dashboard />} />
                <Route path="/profile" element={<ProfileForm />} />
                <Route exact path="/users" element={<UserList />} />
                <Route exact path="/students" element={<StudentList />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects-est" element={<ProjectEst />} />
                <Route path="/projects/register" element={<ProjectRegister />} />
                <Route path="/projects-leader/:id" element={<ProjectLeader />} />
                <Route path="/projects/update/:id" element={<ProjectUpdate />} />
                <Route path="/advances/:id" element={<AdvancesList />} />
                <Route path="/advances/create/:id" element={<AdvanceForm />} />
                <Route path="/advances/update/:id" element={<AdvanceUpdate />} />
                <Route path="/advances/observations/:id" element={<ObservationForm />} />
                <Route path="/enrollments/project/:id" element={<EnrollmentList />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<RegisterForm />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
