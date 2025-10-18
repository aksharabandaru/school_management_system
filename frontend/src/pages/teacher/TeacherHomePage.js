import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

  const classID = currentUser?.teachSclass?._id;
  const subjectID = currentUser?.teachSubject?._id;

  useEffect(() => {
    if (subjectID) dispatch(getSubjectDetails(subjectID, "Subject"));
    if (classID) dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  const numberOfStudents = sclassStudents?.length || 0;
  const numberOfSessions = subjectDetails?.sessions || 0;

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Students */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Class Students</Title>
              <StyledNumber>
                <CountUp start={0} end={numberOfStudents} duration={2.5} />
              </StyledNumber>
            </StyledPaper>
          </Grid>

          {/* Lessons */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Lessons} alt="Lessons" />
              <Title>Total Lessons</Title>
              <StyledNumber>
                <CountUp start={0} end={numberOfSessions} duration={5} />
              </StyledNumber>
            </StyledPaper>
          </Grid>

          {/* Tests */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Tests} alt="Tests" />
              <Title>Tests Taken</Title>
              <StyledNumber>
                <CountUp start={0} end={24} duration={4} />
              </StyledNumber>
            </StyledPaper>
          </Grid>

          {/* Time */}
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Time} alt="Time" />
              <Title>Total Hours</Title>
              <StyledNumber>
                <CountUp start={0} end={30} duration={4} suffix=" hrs" />
              </StyledNumber>
            </StyledPaper>
          </Grid>

          {/* Notices */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

// -------------------- Styled Components --------------------
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 500;
`;

const StyledNumber = styled.span`
  font-size: calc(1.3rem + .6vw);
  color: green;
  font-weight: 600;
`;

export default TeacherHomePage;
