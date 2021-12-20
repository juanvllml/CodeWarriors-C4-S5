import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($campos: UserInput!) {
        createUser(input: $campos) {
            full_name,
            cc,
            email,
            password,
            user_type,
            status
        }
    }
`;


const UPDATE_USER = gql`
    mutation UpdateUser($_id: ID!, $campos: UserInputUpdate!) {
        updateUser(_id: $_id, input: $campos) {
        _id
        status
        }
    }
`;

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        error
        }
    }
`;

const REFRESH_TOKEN = gql`
    mutation RefreshToken {
        refreshToken {
            token
            error
        }
    }
`;



export { UPDATE_USER, CREATE_USER, LOGIN, REFRESH_TOKEN};
