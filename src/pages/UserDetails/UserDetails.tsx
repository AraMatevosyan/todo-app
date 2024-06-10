import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux";
import { fetchUserById } from "../../redux/userDetails/actions";
import {Button} from "../../components";
import { Styled } from "./UserDetails.styled";

export const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { user, loading, error } = useSelector((state: RootState) => state.userDetails);

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id]);

    const handleBackClick = () => {
        navigate("/users");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>No user found</div>;
    }

    return (
        <Styled.UserDetailsWrapper>
            <Button styleType='secondary' onClick={handleBackClick}>Back</Button>
            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
        </Styled.UserDetailsWrapper>
    );
};
