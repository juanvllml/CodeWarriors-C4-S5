// import {gql} from 'apollo-boost'
import {gql} from '@apollo/client'

const GET_ENROLLMENTS = gql`
    query Enrollments {
        enrollments {
            _id
            enrollment_id
            project_id
            student_id
            enrollment_status
            admission_date
            egress_date
        }
    }
`;

const GET_ENROLLMENTS_BY_PROJECT = gql `
    query ($project_id: String!) {
        enrollmentsByProject(project_id: $project_id){
            _id
            enrollment_id
            project_id
            student_id
            enrollment_status
            admission_date
            egress_date
        }
    }
`;



export {
    GET_ENROLLMENTS,
    GET_ENROLLMENTS_BY_PROJECT
};