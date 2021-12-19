import { gql } from '@apollo/client'

const GET_Projects = gql`
    query Projects {
        allProjects {
            _id
            project_id
            project_name
            general_objectives
            specific_objectives
            budget
            start_date
            end_date
            leader_name
            leader_cc
            project_status
            project_stage
        }
    }
`;

const GET_PROJECTS_BY_LEADER = gql `
    query ($leader_cc: String!) {
        projectByLeader(leader_cc: $leader_cc){
            _id,
            project_id,
            project_name,
            general_objectives,
            specific_objectives,
            budget,
            start_date,
            end_date,
            leader_name,
            leader_cc,
            project_status,
            project_stage
        }
    }
`;

const GET_PROJECT_BY_ID = gql `
    query ($_id: String!) {
        projectById(_id: $_id){
            _id,
            project_id,
            project_name,
            general_objectives,
            specific_objectives,
            budget,
            start_date,
            end_date,
            leader_name,
            leader_cc,
            project_status,
            project_stage
        }
    }
`;

export {
    GET_Projects,
    GET_PROJECTS_BY_LEADER,
    GET_PROJECT_BY_ID
};