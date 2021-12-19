import { gql } from '@apollo/client';

const UPDATE_PROJECT = gql`
    mutation UpdateProject($_id: ID!, $campos: ProjectInputUpdate!) {
        updateProject(_id: $_id, input: $campos) {
        _id
        project_status,
        project_stage
        }
    }
`;

const POST_PROJECT = gql`
    mutation CreateProject($campos: ProjectInput!) {
        createProject(input: $campos) {
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
            project_stage,
        }
    }
`;

const UPDATE_PROJECT_LEADER = gql`
    mutation UpdateProjectLeader($_id: ID!, $campos: ProjectInputUpdate!) {
        updateProject(_id: $_id, input: $campos) {
        _id,
        project_name,
        general_objectives,
        specific_objectives,
        budget
        }
    }
`;

export {
    UPDATE_PROJECT,
    POST_PROJECT,
    UPDATE_PROJECT_LEADER
};
