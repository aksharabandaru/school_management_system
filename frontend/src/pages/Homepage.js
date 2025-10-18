import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
  return (
    <PageContainer>
      <Grid container spacing={0} sx={{ height: '100vh' }}>
        {/* Left Image Panel */}
        <Grid item xs={12} md={6}>
          <ImagePanel>
            <img src={Students} alt="Students" />
          </ImagePanel>
        </Grid>

        {/* Right Sign In Panel */}
        <Grid item xs={12} md={6}>
          <RightPanel>
            <ContentBox>
              <Title>Sign In</Title>
              <Description>
                Welcome back! Please login to your account to manage classes, students, and teachers.
              </Description>

              <ButtonGroup>
                <StyledLink to="/choose">
                  <LightPurpleButton variant="contained" fullWidth>
                    Login
                  </LightPurpleButton>
                </StyledLink>

                <StyledLink to="/chooseasguest">
                  <Button variant="outlined" fullWidth sx={{ mt: 2, borderColor: "#550080", color: "#550080" }}>
                    Login as Guest
                  </Button>
                </StyledLink>

                <SmallText>
                  Don't have an account?{' '}
                  <Link to="/Adminregister" style={{ color: "#550080", fontWeight: 600 }}>
                    Sign Up
                  </Link>
                </SmallText>
              </ButtonGroup>
            </ContentBox>
          </RightPanel>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Homepage;
const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const ImagePanel = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 70%;
    max-width: 400px;
  }
`;

const RightPanel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const ContentBox = styled.div`
  width: 80%;
  max-width: 400px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #222;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const ButtonGroup = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SmallText = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-top: 16px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
