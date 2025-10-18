import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Box, Container, CircularProgress, Backdrop } from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (visitor === "guest") {
      let fields;
      if (user === "Admin") fields = { email: "yogendra@12", password };
      else if (user === "Student") fields = { rollNum: "1", studentName: "Dipesh Awasthi", password };
      else if (user === "Teacher") fields = { email: "tony@12", password };

      setLoader(true);
      dispatch(loginUser(fields, user));
    } else {
      navigate(`/${user}login`);
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <UserCard onClick={() => navigateHandler("Admin")}>
              <IconWrapper>
                <AccountCircle fontSize="large" />
              </IconWrapper>
              <CardTitle>Admin</CardTitle>
              <CardDescription>
                Manage school data, users, and system settings with ease.
              </CardDescription>
            </UserCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserCard onClick={() => navigateHandler("Student")}>
              <IconWrapper>
                <School fontSize="large" />
              </IconWrapper>
              <CardTitle>Student</CardTitle>
              <CardDescription>
                Access courses, assignments, and track your academic progress.
              </CardDescription>
            </UserCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UserCard onClick={() => navigateHandler("Teacher")}>
              <IconWrapper>
                <Group fontSize="large" />
              </IconWrapper>
              <CardTitle>Teacher</CardTitle>
              <CardDescription>
                Create courses, assignments, and monitor student progress efficiently.
              </CardDescription>
            </UserCard>
          </Grid>
        </Grid>
      </Container>

      <Backdrop sx={{ color: '#fff', zIndex: 1300 }} open={loader}>
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// ---------------- Styled Components ----------------
const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #f2f2f2, #ffffff);
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 4rem 2rem;
`;

const UserCard = styled(Paper)`
  padding: 2rem;
  text-align: center;
  border-radius: 16px;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  }
`;

const IconWrapper = styled(Box)`
  margin-bottom: 1rem;
  color: #7f56da;
`;

const CardTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: #2c2143;
`;

const CardDescription = styled.p`
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
`;
