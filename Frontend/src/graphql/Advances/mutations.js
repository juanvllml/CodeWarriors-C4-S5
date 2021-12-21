import { gql } from '@apollo/client';

const UPDATE_ADVANCE = gql`
    mutation updateAdvance($_id: ID!, $campos: AdvanceUpdate!) {
        updateAdvance(_id: $_id, input: $campos) {
        _id
        project_id,
        advance_description,
        leader_observations
        }
    }
`;

const POST_ADVANCE = gql`
    mutation createAdvance($campos: AdvanceInput!) {
        createAdvance(input: $campos) {
            advance_id,
            project_id,
            student_id,
            advance_date,
            advance_description,
            leader_observations
        }
    }
`;

export {
    UPDATE_ADVANCE,
    POST_ADVANCE
};
