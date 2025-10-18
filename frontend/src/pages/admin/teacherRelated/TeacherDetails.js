import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Paper, Box } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectAssigned = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
            {loading ? (
                <Typography align="center" sx={{ mt: 5 }}>Loading...</Typography>
            ) : (
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        bgcolor: "#fdfdfd",
                        borderRadius: 3,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    }}
                >
                    <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3 }}>
                        Teacher Details
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            <strong>Name:</strong> {teacherDetails?.name || 'N/A'}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <strong>Class:</strong> {teacherDetails?.teachSclass?.sclassName || 'N/A'}
                        </Typography>

                        {isSubjectAssigned ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    <strong>Subject:</strong> {teacherDetails?.teachSubject?.subName}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    <strong>Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                                </Typography>
                            </>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAddSubject}
                                sx={{ mt: 2, borderRadius: 2, px: 3 }}
                            >
                                Add Subject
                            </Button>
                        )}
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default TeacherDetails;
