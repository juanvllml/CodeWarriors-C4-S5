import { gql } from '@apollo/client'

const GET_ADVANCES = gql`
    query Advances {
        advances {
            _id
            advance_id
            project_id
            student_id
            advance_date
            advance_description
            leader_observations
    }
    }
`;

const GET_ADVANCES_BY_PROJECT = gql `
    query ($project_id: String!) {
        advancesByProject(project_id: $project_id){
            _id
            advance_id
            project_id
            student_id
            advance_date
            advance_description
            leader_observations
        }
    }
`;


export {
    GET_ADVANCES,
    GET_ADVANCES_BY_PROJECT
};