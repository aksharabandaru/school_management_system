import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import {
    Box, Container, Typography, Tab, IconButton, Paper
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";

import PostAddIcon from '@mui/icons-material/PostAdd';

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading } = useSelector(state => state.sclass);
    const classID = params.id;

    const [value, setValue] = useState('1');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    const handleChange = (event, newValue) => setValue(newValue);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    // -------------------- SUBJECTS --------------------
    const subjectColumns = [
        { id: 'name', label: 'Subject Name', minWidth: 170 },
        { id: 'code', label: 'Subject Code', minWidth: 100 },
    ];

    const subjectRows = subjectsList?.map(sub => ({
        name: sub.subName,
        code: sub.subCode,
        id: sub._id,
    })) || [];

    const subjectActions = [
        { icon: <PostAddIcon color="primary" />, name: 'Add New Subject', action: () => navigate(`/Admin/addsubject/${classID}`) },
        { icon: <DeleteIcon color="error" />, name: 'Delete All Subjects', action: () => deleteHandler(classID, "SubjectsClass") },
    ];

    const SubjectsButtonHaver = ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}
                sx={{ bgcolor: "#fce4ec", '&:hover': { bgcolor: "#f8bbd0" } }}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                startIcon={<PostAddIcon />}
                sx={{ borderRadius: '20px', px: 2, bgcolor: '#e0f7fa', color: '#006064', '&:hover': { bgcolor: '#b2ebf2' } }}
                onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
            >
                View
            </BlueButton>
        </Box>
    );

    const ClassSubjectsSection = () => (
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Subjects List</Typography>
            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
            <SpeedDialTemplate actions={subjectActions} />
        </Paper>
    );

    // -------------------- STUDENTS --------------------
    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents?.map(student => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    })) || [];

    const StudentsButtonHaver = ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => deleteHandler(row.id, "Student")}
                sx={{ bgcolor: "#fce4ec", '&:hover': { bgcolor: "#f8bbd0" } }}>
                <PersonRemoveIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                sx={{ borderRadius: '20px', px: 2, bgcolor: '#e0f7fa', color: '#006064', '&:hover': { bgcolor: '#b2ebf2' } }}
                onClick={() => navigate(`/Admin/students/student/${row.id}`)}
            >
                View
            </BlueButton>
            <PurpleButton
                variant="contained"
                sx={{ borderRadius: '20px', px: 2, bgcolor: '#ede7f6', color: '#4527a0', '&:hover': { bgcolor: '#d1c4e9' } }}
                onClick={() => navigate(`/Admin/students/student/attendance/${row.id}`)}
            >
                Attendance
            </PurpleButton>
        </Box>
    );

    const studentActions = [
        { icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student', action: () => navigate(`/Admin/class/addstudents/${classID}`) },
        { icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students', action: () => deleteHandler(classID, "StudentsClass") },
    ];

    const ClassStudentsSection = () => (
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>Students List</Typography>
            <TableTemplate buttonHaver={StudentsButtonHaver} columns={studentColumns} rows={studentRows} />
            <SpeedDialTemplate actions={studentActions} />
        </Paper>
    );

    const ClassDetailsSection = () => (
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>Class Details</Typography>
            <Typography variant="h6" gutterBottom>This is Class {sclassDetails?.sclassName}</Typography>
            <Typography variant="body1">Number of Subjects: {subjectsList?.length || 0}</Typography>
            <Typography variant="body1">Number of Students: {sclassStudents?.length || 0}</Typography>
        </Paper>
    );

    const ClassTeachersSection = () => (
        <Paper elevation={1} sx={{ p: 3, mt: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h5">Teachers</Typography>
            <Typography variant="body2" color="text.secondary">This section can display assigned teachers.</Typography>
        </Paper>
    );

    return (
        <>
            {loading ? (
                <Typography align="center" sx={{ mt: 5 }}>Loading...</Typography>
            ) : (
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                            <TabList onChange={handleChange}>
                                <Tab label="Details" value="1" />
                                <Tab label="Subjects" value="2" />
                                <Tab label="Students" value="3" />
                                <Tab label="Teachers" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1"><ClassDetailsSection /></TabPanel>
                        <TabPanel value="2"><ClassSubjectsSection /></TabPanel>
                        <TabPanel value="3"><ClassStudentsSection /></TabPanel>
                        <TabPanel value="4"><ClassTeachersSection /></TabPanel>
                    </TabContext>
                </Container>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ClassDetails;
