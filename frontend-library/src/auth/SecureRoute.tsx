
import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAuth } from './AuthContext';
import {SpinnerLoading} from "../layouts/Utils/SpinnerLoading.tsx";

export const SecureRoute = (props: {comp: React.ElementType}) => {
    const { isAuth, loading } = useAuth()

    if (loading) {
        return <SpinnerLoading/>
    }

    return isAuth ? <props.comp /> : <Navigate to="/login" />;
};

