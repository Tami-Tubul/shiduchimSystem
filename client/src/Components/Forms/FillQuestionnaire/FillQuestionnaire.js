import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Button, Grid, Card, Alert } from '@mui/material';
import Header from '../../Header/Header';
import Recomended from '../RecomendedPeople/Recomended';
import InLaws from '../InLaws/InLaws';
import './FillQuestionnaire.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FormPropsTextFields() {
  const [form, setForm] = React.useState({ recomendedPeople: [], inLaws: [] });
  const [recomendForm, setRecomendForm] = React.useState([]);
  const [inLawsForm, setInLawsForm] = React.useState([]);

  const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(null);
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);


  const handleChangeInput = (e) => {
    const currentField = { [e.target.name]: e.target.value }
    setForm({ ...form, ...currentField });
  }

  const handleChangeInputRecomended = (e) => {
    const currentField = { [e.target.name]: e.target.value }
    setRecomendForm({ ...recomendForm, ...currentField });
  }

  const handleChangeInputInLaw = (e) => {
    const currentField = { [e.target.name]: e.target.value }
    setInLawsForm({ ...inLawsForm, ...currentField });
  }

  const handleAddRecomended = () => {
    if (form.recomendedPeople.length >= 1) {
      form.recomendedPeople.push(recomendForm);
      setForm(form)
    }
    else {
      setForm({ ...form, recomendedPeople: [recomendForm] });
    }
    console.log('form', form)

    setRecomendForm([]);
  }


  const handleAddInLaws = () => {
    if (form.inLaws.length >= 1) {
      form.inLaws.push(inLawsForm);
      setForm(form)
    }
    else {
      setForm({ ...form, inLaws: [inLawsForm] });
    }
    console.log('form', form)
    setInLawsForm([]);
  }

  const handleSubmitForm = async () => {

    form.inLaws.push(inLawsForm);
    form.recomendedPeople.push(recomendForm);

    axios.post("http://localhost:5000/api/shiduchim/public/register-candidate", form)
      .then(resp => {
        if (resp.status === 201) {
          setSuccessRegistrationMessage(resp.data.message);
        }

      }).catch(err => {
        setErrorAfterSubmit(err.response.data.message)
      })
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    if (activeStep === 6 || (activeStep + 1 === 6)) {
      handleSubmitForm();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };




  return (
    <>
      <Header />
      <div className='FillQuestionarie'>
        <Card variant="outlined">
          <Stepper activeStep={activeStep}>
            <Step>
              <StepLabel>פרטים אישיים</StepLabel>
            </Step>
            <Step>
              <StepLabel>דרישות מבן/בת הזוג</StepLabel>
            </Step>
            <Step>
              <StepLabel>שאלות נוספות</StepLabel>
            </Step>
            <Step>
              <StepLabel>מקורות לבירורים</StepLabel>
            </Step>
            <Step>
              <StepLabel>מחותנים</StepLabel>
              <Typography variant="caption">אופציונלי</Typography>
            </Step>
            <Step>
              <StepLabel>ממלא הטופס</StepLabel>
            </Step>

          </Stepper>

          <React.Fragment>
            {activeStep === 0 && (
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    required
                    label="שם פרטי"
                    name="firstName"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם משפחה"
                    name="lastName"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מין"
                    name="gender"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גיל"
                    name="age"
                    type="number"
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב משפחתי"
                    name="familyStatus"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="תאריך לידה"
                    name="bornDate"
                    type="date"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיר"
                    name="city"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="ארץ לידה"
                    name="countryBirth"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="טלפון"
                    name="phone"
                    defaultValue=""
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="מייל"
                    name="email"
                    defaultValue=""
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="תכונות אופי"
                    name="characters"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גוון עור"
                    name="colorSkin"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גובה"
                    name="height"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="מבנה גוף"
                    name="bodyStracture"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב בריאותי"
                    name="healthCondition"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב כלכלי"
                    name="economicSituation"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="סגנון לבוש"
                    name="clothingStyle"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מראה כללי"
                    name="look"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="כיסוי ראש"
                    name="headdress"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שיוך מגזרי"
                    name="sector"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עידה"
                    name="origin"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="תמונת המועמד"
                    name="picture"
                    type="file"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="התחייבות כספית"
                    name="commitMoney"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="דרישה כספית"
                    name="requireMoney"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מקום לימודים/עבודה"
                    name="yeshivaOrSeminar"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עובד/לומד"
                    name="doingToday"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם האב"
                    name="fatherName"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיסוק האב"
                    name="fatherDoing"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם האם"
                    name="motherName"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיסוק האם"
                    name="motherDoing"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מוצא האב"
                    name="mozaAv"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מוצא האם"
                    name="mozaEm"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מס' אחים ואחיות"
                    name="siblings"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="סטטוס הורים"
                    name="parentStatus"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שיטה הלכתית"
                    name="halachaMethod"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>

              </Grid>)}
            {activeStep === 1 && (
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    required
                    label="שיוך מגזרי"
                    name="drishotSector"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מראה כללי"
                    name="drishotLook"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="תכונות אופי"
                    name="drishotCharacters"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="ארץ מוצא מועדף"
                    name="drishotFavoriteMoza"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="לא ממוצא"
                    name="drishotNotMoza"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מגיל"
                    name="fromAge"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עד גיל"
                    name="mostAge"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מגובה"
                    name="fromHeight"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עד גובה"
                    name="mostHeight"
                    type="number"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep === 2 && (
              <Grid container spacing={2}>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת טלפון כשר?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="no"
                      name="casherPhone"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="כן" />
                      <FormControlLabel value="no" control={<Radio />} label="לא" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת רישיון?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="no"
                      name="licence"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="כן" />
                      <FormControlLabel value="no" control={<Radio />} label="לא" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">האם מעשן?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="no"
                      name="smoking"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value="yes" control={<Radio />} label="כן" />
                      <FormControlLabel value="no" control={<Radio />} label="לא" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            {activeStep === 3 && (
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    required
                    label="שם"
                    name="recommendName"
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="טלפון"
                    name="recommendPhone"
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="קרבה"
                    name="recommendRelative"
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                {form.recomendedPeople && form.recomendedPeople.map((recomend, index) => <Recomended index={index + 1} data={recomend} handleChange={handleChangeInputRecomended} />)}
                <Button onClick={handleAddRecomended}>הוסף</Button>
              </Grid>
            )}
            {
              activeStep === 4 && (
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      required
                      label="שם"
                      name="fatherInLawName"
                      defaultValue=""
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      label="טלפון"
                      name="fatherInLawPhone"
                      defaultValue=""
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      required
                      label="עיר"
                      name="fatherInLawCity"
                      defaultValue=""
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  {form.inLaws && form.inLaws.map(() => <InLaws handleChange={handleChangeInputInLaw} />)}
                  <Button onClick={handleAddInLaws}>הוסף</Button>
                </Grid>
              )
            }
            {activeStep === 5 && (
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    required
                    label="שם ממלא הטופס"
                    name="fillQuestionarieName"
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label=" טלפון ממלא הטופס"
                    name="fillQuestionariePhone"
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label=" קרבה למועמד"
                    name="fillQuestionarieRelative"
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            )}
            {activeStep < 6 && <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                הקודם
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  דלג
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === 5 ? 'שליחה' : 'הבא'}
              </Button>
            </Box>}
          </React.Fragment>
        </Card>
        {successRegistrationMessage && <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {successRegistrationMessage}
          <Link to="/CloseEngagedPage">לצפייה בכרטיסי שידוכים</Link>
        </Typography>}
        {errorAfterSubmit && <Alert severity="error">{errorAfterSubmit}</Alert>}
      </div>
    </>
  );
}