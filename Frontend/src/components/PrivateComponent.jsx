import React from 'react';
import { useUser } from '../context/userContext';

const PrivateComponent = ({ roleList, children }) => {
    const { userData } = useUser();
    if (roleList.includes(userData.user_type)) {
        return children;
    }

    return <></>;
};

export default PrivateComponent;