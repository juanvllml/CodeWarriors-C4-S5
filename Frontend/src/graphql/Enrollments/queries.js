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

export {
    GET_ENROLLMENTS
};