// import {gql} from 'apollo-boost'
import {gql} from '@apollo/client'

const GET_Users = gql`
    query Users {
        allUsers {
            _id
            full_name
            cc
            email
            password
            user_type
            status
        }
    }
`;

const GET_STUDENTS = gql `
    query ($user_type: String!){
        usersByType(user_type: $user_type) {
            _id,
            full_name,
            cc,
            email,
            user_type,
            status
        }
    }
`;

export {
    GET_Users,
    GET_STUDENTS
};