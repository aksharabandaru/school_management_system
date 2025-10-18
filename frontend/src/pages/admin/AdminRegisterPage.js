import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Box,
    Typography,
    TextField,
    Checkbox,
    FormControlLabel,
    CssBaseline,
    IconButton,
    InputAdornment,
    CircularProgress,
    Paper
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import bgpic from "../../assets/designlogin.jpg";
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* Right Form Panel */}
                <Grid item xs={12} md={6} component={Paper} elevation={8} square>
                    <FormContainer>
                        <Typography variant="h4" sx={{ mb: 2, color: "#2c2143", fontWeight: 700 }}>
                            Admin Register
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: "#555" }}>
                            Create your own school by registering as an admin. <br />
                            You will be able to add students and faculty and manage the system.
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit}>
                            <StyledTextField
                                name="adminName"
                                label="Full Name"
                                fullWidth
                                required
                                error={adminNameError}
                                helperText={adminNameError && "Name is required"}
                                onChange={handleInputChange}
                            />
                            <StyledTextField
                                name="schoolName"
                                label="School Name"
                                fullWidth
                                required
                                error={schoolNameError}
                                helperText={schoolNameError && "School name is required"}
                                onChange={handleInputChange}
                            />
                            <StyledTextField
                                name="email"
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                error={emailError}
                                helperText={emailError && "Email is required"}
                                onChange={handleInputChange}
                            />
                            <StyledTextField
                                name="password"
                                label="Password"
                                type={toggle ? "text" : "password"}
                                fullWidth
                                required
                                error={passwordError}
                                helperText={passwordError && "Password is required"}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Remember me"
                                sx={{ mt: 1 }}
                            />

                            <LightPurpleButton
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Register"}
                            </LightPurpleButton>

                            <BottomText>
                                Already have an account?{' '}
                                <StyledLink to="/Adminlogin">Log in</StyledLink>
                            </BottomText>
                        </Box>
                    </FormContainer>
                </Grid>

                {/* Left Image Panel */}
                <Grid
                    item
                    xs={false}
                    md={6}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
};

export default AdminRegisterPage;

// ------------------------ Styled Components ------------------------
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 40px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 20px !important;

  & label.Mui-focused {
    color: #550080;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #550080;
    }
  }
`;

const StyledLink = styled(Link)`
  color: #550080;
  font-weight: 600;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomText = styled(Typography)`
  margin-top: 16px !important;
  color: #555;
  font-size: 0.95rem !important;
  text-align: center;
`;
