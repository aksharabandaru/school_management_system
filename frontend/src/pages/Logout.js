import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <h2>Hello, {currentUser?.name || "User"}</h2>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonsWrapper>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </ButtonsWrapper>
        </LogoutContainer>
    );
};

export default Logout;

// ---------------- STYLES ----------------
const LogoutContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: #fdfdfd;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  text-align: center;
`;

const LogoutMessage = styled.p`
  margin: 20px 0;
  font-size: 16px;
  color: #555;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
`;

const LogoutButton = styled.button`
  flex: 1 1 120px;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #6c5b7b;
`;
