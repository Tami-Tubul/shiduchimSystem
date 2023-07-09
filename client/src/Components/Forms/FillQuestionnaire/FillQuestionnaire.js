import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SendIcon from '@mui/material/IconButton';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { Button, Grid, Card } from '@mui/material';
import Header from '../../Header/Header';
import Recomended from '../RecomendedPeople/Recomended';
import InLaws from '../InLaws/InLaws';
import {addRegister} from '../../../store/user/userActions';
import './FillQuestionnaire.css';

export default function FormPropsTextFields() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);
  const [form, setForm] = React.useState({ recomendedPeople: [], inLaws: [] });
  const [recomendForm, setRecomendForm] = React.useState([]);
  const [inLawsForm, setInLawsForm] = React.useState([]);

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

  const handleSubmitForm = () => {
    form.inLaws.push(inLawsForm);
    form.recomendedPeople.push(recomendForm);
    if (!data.registers) {
      dispatch(addRegister([{...form, id: 0}]));
  } else {
      const registeredList = data.registers;
      registeredList.push({ ...form, id: data.registers.length });
      console.log(registeredList);
      dispatch(addRegister(registeredList));
      // TODO: שליחת פרטי טופס רישום מועמד
  }
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

  const handleReset = () => {
    setActiveStep(0);
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
        {/* <div>
        <Grid container spacing={{ xs: 2, md: 4 }}>
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
              label="שם משפחה"
              name="lastName"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="גיל"
              name="age"
              type="numer"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מצב משפחתי"
              name="familyStatus"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="תאריך לידה"
              name="bornDate"
              type="date"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="עיר"
              name="city"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="טלפון"
              name="telphone"
              defaultValue=""
              onChange={handleChangeInput}
            /></Grid>
          <Grid item>
            <TextField
              label="תכונות אופי"
              name="characteristics"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="גוון עור"
              name="skinTone"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="גובה"
              name="height"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            /></Grid>
          <Grid item>
            <TextField
              label="מבנה גוף"
              name="bodyStructure"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מצב בריאותי"
              name="healthCondition"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מצב כלכלי"
              name="economicSituation"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="סגנון לבוש"
              name="clothingStyle"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מראה כללי"
              name="generalLook"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="כיסוי ראש"
              name="HeadDress"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="שיוך מגזרי"
              name="SectoralAssociation"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="תמונת המועמד"
              name="pictue"
              type="file"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="התחייבות כספית"
              name="financialCommitment"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="דרישה כספית"
              name="financialRequirement"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מקום לימודים"
              name="placeOfStudy"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="רקע דתי"
              name="religiousBackground          "
              defaultValue=""
              onChange={handleChangeInput}
            /> </Grid>
          <Grid item>
            <TextField
              label="עובד/לומד"
              name="work/study"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="שם האב"
              name="fatherName"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="עיסוק האב"
              name="father'sOccupation"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="שם האם"
              name="motherName"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="עיסוק האם"
              name="mother'sOccupation"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מצוא האב"
              name="father'sAncestry"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מוצא האם"
              name="mother'sAncestry"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מס' אחים ואחיות"
              name="numOfSistersAndBrothers"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="סטטוס הורים"
              name="parent`sStatus"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="שיטה הלכתית"
              name="HalachicMethod"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>
        <Divider 
        <h2>דרישות מבן/בת הזוג:</h2>
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="שיוך מגזרי"
              name="SectoralAssociation"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מראה כללי"
              name="generalLook"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="תכונות אופי"
              name="Characteristics"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="ארץ מוצא מועדף"
              name="preferredCountryOfOrigin"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="לא ממוצא"
              name="notOfOrigin"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מגיל"
              name="fromAge"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="עד גיל"
              name="tillAge"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="מגובה"
              name="fromHeight"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid item>
            <TextField
              label="עד גובה"
              name="tillHeight"
              type="number"
              defaultValue=""
              onChange={handleChangeInput}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת משקפיים?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="glasses"
                onChange={handleChangeInput}
              >
                <FormControlLabel value="yes" control={<Radio />} label="כן" />
                <FormControlLabel value="no" control={<Radio />} label="לא" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת טלפון כשר?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="kosherPhone"
                onChange={handleChangeInput}
              >
                <FormControlLabel value="yes" control={<Radio />} label="כן" />
                <FormControlLabel value="no" control={<Radio />} label="לא" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת מחשב?</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="no"
                name="computer"
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
                name="license"
                onChange={handleChangeInput}
              >
                <FormControlLabel value="yes" control={<Radio />} label="כן" />
                <FormControlLabel value="no" control={<Radio />} label="לא" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Divider>מקורות לבירורים:</Divider>
        <Grid container>
          <Grid item>
            <TextField
              label="שם"
              name="RecommendName"
              onChange={handleChangeInputRecomended}
              color="error"
            />
            <TextField
              label="טלפון"
              name="RecommendPhone"
              onChange={handleChangeInputRecomended}
              color="error"
            />
            <TextField
              label="קרבה"
              name="RecommendRelative"
              onChange={handleChangeInputRecomended}
              color="error"
            />
            {form.recomendedPeople && form.recomendedPeople.map((recomend, index) => <Recomended index={index + 1} data={recomend} handleChange={handleChangeInputRecomended} />)}
            <Button onClick={handleAddRecomended}>Add</Button>
          </Grid>
        </Grid>
        <Divider>:מחותנים</Divider>
        <Grid container>
          <Grid item>
            <TextField
              label="שם"
              name="fatherInLawName"
              defaultValue=""
              onChange={handleChangeInputInLaw}
            />
            <TextField
              label="טלפון"
              name="fatherInLawPhone"
              defaultValue=""
              onChange={handleChangeInputInLaw}
            />
            <TextField
              label="עיר"
              name="fatherInLawCity"
              defaultValue=""
              onChange={handleChangeInputInLaw}
            />
          </Grid>
        </Grid>
        {form.inLaws && form.inLaws.map(() => <InLaws handleChange={handleChangeInputInLaw} />)}
        <Button onClick={handleAddInLaws}>Add</Button>
        <Divider>
          <Grid container>
            <Grid item>
              <TextField
                label="שם ממלא הטופס"
                name="fillQuestionarieName"
                onChange={handleChangeInput}
              />
              <TextField
                label=" טלפון ממלא הטופס"
                name="fillQuestionariePhone"
                onChange={handleChangeInput}
              />
              <TextField
                label=" קרבה למועמד"
                name="fillQuestionarieRelative"
                onChange={handleChangeInput}
              />
              <TextField
                label="התחייבות לשדכנת"
                name="commitmentToTheMatchmaker"
                onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </Divider>
        <Button onClick={handleSubmitForm} variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </div> */}
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
                  label="שם משפחה"
                  name="lastName"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מין"
                  name="gender"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="גיל"
                  name="age"
                  type="numer"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מצב משפחתי"
                  name="familyStatus"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="תאריך לידה"
                  name="bornDate"
                  type="date"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עיר"
                  name="city"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                  <TextField
                    label="ארץ לידה"
                    name="countryBirth"
                    defaultValue=""
                    onChange={handleChangeInput}
                  />
                </Grid>
              <Grid item>
                <TextField
                  label="טלפון"
                  name="telphone"
                  defaultValue=""
                  onChange={handleChangeInput}
                /></Grid>
                 <Grid item>
                <TextField
                  label="מייל"
                  name="email"
                  defaultValue=""
                  onChange={handleChangeInput}
                /></Grid>
              <Grid item>
                <TextField
                  label="תכונות אופי"
                  name="characteristics"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="גוון עור"
                  name="skinTone"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="גובה"
                  name="height"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                /></Grid>
              <Grid item>
                <TextField
                  label="מבנה גוף"
                  name="bodyStructure"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מצב בריאותי"
                  name="healthCondition"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מצב כלכלי"
                  name="economicSituation"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="סגנון לבוש"
                  name="clothingStyle"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מראה כללי"
                  name="generalLook"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="כיסוי ראש"
                  name="HeadDress"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="שיוך מגזרי"
                  name="SectoralAssociation"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עידה"
                  name="origin"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="תמונת המועמד"
                  name="pictue"
                  type="file"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="התחייבות כספית"
                  name="financialCommitment"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="דרישה כספית"
                  name="financialRequirement"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מקום לימודים"
                  name="placeOfStudy"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              {/* <Grid item>
                <TextField
                  label="רקע דתי"
                  name="religiousBackground          "
                  defaultValue=""
                  onChange={handleChangeInput}
                /> </Grid> */}
              <Grid item>
                <TextField
                  label="עובד/לומד"
                  name="work/study"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="שם האב"
                  name="fatherName"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עיסוק האב"
                  name="father'sOccupation"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="שם האם"
                  name="motherName"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עיסוק האם"
                  name="mother'sOccupation"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מוצא האב"
                  name="father'sAncestry"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מוצא האם"
                  name="mother'sAncestry"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מס' אחים ואחיות"
                  name="numOfSistersAndBrothers"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="סטטוס הורים"
                  name="parent`sStatus"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="שיטה הלכתית"
                  name="HalachicMethod"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              
            </Grid>)}
          {activeStep === 1 && (
            <Grid container spacing={2}>
              <Grid item>
                <TextField
                  label="שיוך מגזרי"
                  name="SectoralAssociation"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מראה כללי"
                  name="generalLook"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="תכונות אופי"
                  name="Characteristics"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="ארץ מוצא מועדף"
                  name="preferredCountryOfOrigin"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="לא ממוצא"
                  name="notOfOrigin"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מגיל"
                  name="fromAge"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עד גיל"
                  name="tillAge"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="מגובה"
                  name="fromHeight"
                  type="number"
                  defaultValue=""
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="עד גובה"
                  name="tillHeight"
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
                    name="kosherPhone"
                    onChange={handleChangeInput}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="כן" />
                    <FormControlLabel value="no" control={<Radio />} label="לא" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* <Grid item>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת מחשב?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="no"
                    name="computer"
                    onChange={handleChangeInput}
                  >
                    <FormControlLabel value="yes" control={<Radio />} label="כן" />
                    <FormControlLabel value="no" control={<Radio />} label="לא" />
                  </RadioGroup>
                </FormControl>
              </Grid> */}
              <Grid item>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת רישיון?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="no"
                    name="license"
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
                    name="glasses"
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
                  label="שם"
                  name="RecommendName"
                  onChange={handleChangeInputRecomended}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="טלפון"
                  name="RecommendPhone"
                  onChange={handleChangeInputRecomended}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="קרבה"
                  name="RecommendRelative"
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
                    label="שם"
                    name="fatherInLawName"
                    defaultValue=""
                    onChange={handleChangeInputInLaw}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="טלפון"
                    name="fatherInLawPhone"
                    defaultValue=""
                    onChange={handleChangeInputInLaw}
                  />
                </Grid>
                <Grid item>
                  <TextField
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
                  label="שם ממלא הטופס"
                  name="fillQuestionarieName"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label=" טלפון ממלא הטופס"
                  name="fillQuestionariePhone"
                  onChange={handleChangeInput}
                />
              </Grid>
              <Grid item>
                <TextField
                  label=" קרבה למועמד"
                  name="fillQuestionarieRelative"
                  onChange={handleChangeInput}
                />
              </Grid>
              {/* <Grid item>
                <TextField
                  label="התחייבות לשדכנת"
                  name="commitmentToTheMatchmaker"
                  onChange={handleChangeInput}
                />
              </Grid> */}
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
    </div>
    </>
  );
}