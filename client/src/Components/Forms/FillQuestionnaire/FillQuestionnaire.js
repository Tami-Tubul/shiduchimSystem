import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Grid, Card, Alert } from '@mui/material';
import Header from '../../Header/Header';
import Recomended from '../RecomendedPeople/Recomended';
import InLaws from '../InLaws/InLaws';
import './FillQuestionnaire.css';


export default function FormPropsTextFields() {
  const [form, setForm] = React.useState({ recomendedPeople: [], inLaws: [], casherPhone: false, licence: false, smoking: false });
  const [recomendForm, setRecomendForm] = React.useState([]);
  const [inLawsForm, setInLawsForm] = React.useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [successRegistrationMessage, setSuccessRegistrationMessage] = useState(null);
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(null);


  const handleChangeInput = (e) => {
    const currentField = { [e.target.name]: e.target.value }
    setForm({ ...form, ...currentField });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  }

  const handleChangeInputRecomended = (e) => {
    const currentField = { [e.target.name]: e.target.value }
    setRecomendForm({ ...recomendForm, ...currentField });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
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

  const handleValidateStep = () => {
    const RequiredFieldsStep1 = ['firstName', 'lastName', 'gender', 'age', 'familyStatus', 'bornDate', 'city', 'countryBirth', 'phone', 'email', 'characters', 'colorSkin', 'height', 'bodyStracture', 'healthCondition', 'economicSituation', 'clothingStyle', 'look', 'headdress', 'sector', 'origin', 'yeshivaOrSeminar', 'doingToday', 'fatherName', 'fatherDoing', 'motherName', 'motherDoing', 'mozaAv', 'mozaEm', 'siblings', 'parentStatus', 'halachaMethod'];
    const RequiredFieldsStep2 = ['drishotSector', 'drishotLook', 'drishotFavoriteMoza', 'fromAge', 'mostAge', 'fromHeight', 'mostHeight'];
    const RequiredFieldsStep6 = ['fillQuestionarieName', 'fillQuestionariePhone', 'fillQuestionarieRelative'];

    let errors = {};
    const filledFields = Object.keys(form);
    if (activeStep === 0) {
      RequiredFieldsStep1.map((required) => {
        const isFilled = filledFields.find((field) => field === required);
        if (!isFilled) {
          errors = { ...errors, [required]: "נא למלא שדה חובה" };
        }
        if (isFilled) {
          errors = { ...errors, [required]: "" };
        }
      });
    }
    if (activeStep === 1) {
      RequiredFieldsStep2.map((required) => {
        const isFilled = filledFields.find((field) => field === required);
        if (!isFilled) {
          errors = { ...errors, [required]: "נא למלא שדה חובה" };
        }
        if (isFilled) {
          errors = { ...errors, [required]: "" };
        }
      });
    }
    if (activeStep === 3) {
      if (recomendForm.length === 0 && form.recomendedPeople.length === 0)
        errors = { ...errors, recommendName: "נא למלא שדה חובה", recommendPhone: "נא למלא שדה חובה", recommendRelative: "נא למלא שדה חובה" }
    }
    if (activeStep === 5) {
      RequiredFieldsStep6.map((required) => {
        const isFilled = filledFields.find((field) => field === required);
        if (!isFilled) {
          errors = { ...errors, [required]: "נא למלא שדה חובה" };
        }
        if (isFilled) {
          errors = { ...errors, [required]: "" };
        }
      });
    }
    const isNotValidStep = (errors !== {}) && Object.values(errors).find((error) => {
      return error === "נא למלא שדה חובה"
    }
    );
    setFormErrors(errors);
    return isNotValidStep;
  }

  const handleSubmitForm = async () => {

    form.inLaws.push(inLawsForm);
    form.recomendedPeople.push(recomendForm);
    console.log(form);
    let newRecomendedPeople = [];
    form.recomendedPeople && form.recomendedPeople.length >= 1 && form.recomendedPeople.map((r) => {
      if (r.recommendRelative || r.recommendPhone || r.recommendPhone) {
        newRecomendedPeople.push(r);
      }
    });
    let newInLaws = [];
    form.inLaws && form.inLaws.length >= 1 && form.inLaws.map((l) => {
      if (l.fatherInLawPhone || l.fatherInLawName || l.fatherInLawCity) {
        newInLaws.push(l);
      }
    });
    setForm({ ...form, inLaws: newInLaws, recomendedPeople: newRecomendedPeople });
    const updatedForm = { ...form, inLaws: newInLaws, recomendedPeople: newRecomendedPeople };
    console.log('updatedForm', updatedForm)
    axios.post("http://localhost:5000/api/shiduchim/public/register-candidate", updatedForm)
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
  const [returnedBack, setReturenedBack] = React.useState(false);

  const isStepOptional = (step) => {
    return step === 4;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (activeStep === 3) {
      handleAddRecomended();
    }
    const isNotValidStep = handleValidateStep();
    if (!isNotValidStep) {
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
      if (activeStep === 6 || (activeStep + 1 === 6)) {
        handleSubmitForm();
      }
    }
  };

  const handleBack = () => {
    setReturenedBack(true);
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
                    error={formErrors.firstName}
                    helperText={formErrors.firstName}
                    defaultValue={form.firstName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם משפחה"
                    name="lastName"
                    error={formErrors.lastName}
                    helperText={formErrors.lastName}
                    defaultValue={form.lastName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">מין</InputLabel>
                    <Select
                      required
                      name='gender'
                      label="מין"
                      onChange={handleChangeInput}
                      error={formErrors.gender}
                      helperText={formErrors.gender}
                      defaultValue={form.gender}
                    >
                      <MenuItem value="זכר" >זכר</MenuItem>
                      <MenuItem value="נקבה">נקבה</MenuItem>
                    </Select>
                    {formErrors.gender && <FormHelperText>{formErrors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גיל"
                    name="age"
                    type="number"
                    error={formErrors.age}
                    helperText={formErrors.age}
                    defaultValue={form.age}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב משפחתי"
                    name="familyStatus"
                    error={formErrors.familyStatus}
                    helperText={formErrors.familyStatus}
                    defaultValue={form.familyStatus}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="תאריך לידה"
                    name="bornDate"
                    type="date"
                    error={formErrors.bornDate}
                    helperText={formErrors.bornDate}
                    defaultValue={form.bornDate}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיר"
                    name="city"
                    error={formErrors.city}
                    helperText={formErrors.city}
                    defaultValue={form.city}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="ארץ לידה"
                    name="countryBirth"
                    error={formErrors.countryBirth}
                    helperText={formErrors.countryBirth}
                    defaultValue={form.countryBirth}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="טלפון"
                    name="phone"
                    error={formErrors.phone}
                    helperText={formErrors.phone}
                    defaultValue={form.phone}
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="מייל"
                    name="email"
                    error={formErrors.email}
                    helperText={formErrors.email}
                    defaultValue={form.email}
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="תכונות אופי"
                    name="characters"
                    error={formErrors.characters}
                    helperText={formErrors.characters}
                    defaultValue={form.characters}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גוון עור"
                    name="colorSkin"
                    error={formErrors.colorSkin}
                    helperText={formErrors.colorSkin}
                    defaultValue={form.colorSkin}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="גובה"
                    name="height"
                    type="number"
                    error={formErrors.colorSkin}
                    helperText={formErrors.colorSkin}
                    defaultValue={form.colorSkin}
                    onChange={handleChangeInput}
                  /></Grid>
                <Grid item>
                  <TextField
                    required
                    label="מבנה גוף"
                    name="bodyStracture"
                    error={formErrors.bodyStracture}
                    helperText={formErrors.bodyStracture}
                    defaultValue={form.bodyStracture}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב בריאותי"
                    name="healthCondition"
                    error={formErrors.healthCondition}
                    helperText={formErrors.healthCondition}
                    defaultValue={form.healthCondition}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מצב כלכלי"
                    name="economicSituation"
                    error={formErrors.economicSituation}
                    helperText={formErrors.economicSituation}
                    defaultValue={form.economicSituation}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="סגנון לבוש"
                    name="clothingStyle"
                    error={formErrors.clothingStyle}
                    helperText={formErrors.clothingStyle}
                    defaultValue={form.clothingStyle}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מראה כללי"
                    name="look"
                    error={formErrors.look}
                    helperText={formErrors.look}
                    defaultValue={form.look}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="כיסוי ראש"
                    name="headdress"
                    error={formErrors.headdress}
                    helperText={formErrors.headdress}
                    defaultValue={form.headdress}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">שיוך מגזרי</InputLabel>
                    <Select
                      required
                      name='sector'
                      label="שיוך מגזרי"
                      onChange={handleChangeInput}
                      error={formErrors.sector}
                      helperText={formErrors.sector}
                      defaultValue={form.sector}
                    >
                      <MenuItem value="ספרדי" >ספרדי</MenuItem>
                      <MenuItem value="חסידי" >חסידי</MenuItem>
                      <MenuItem value="ליטאי">ליטאי</MenuItem>
                      <MenuItem value="תימני">תימני</MenuItem>

                    </Select>
                    {formErrors.sector && <FormHelperText>{formErrors.sector}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עדה"
                    name="origin"
                    error={formErrors.origin}
                    helperText={formErrors.origin}
                    defaultValue={form.origin}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="התחייבות כספית"
                    name="commitMoney"
                    type="number"
                    error={formErrors.commitMoney}
                    helperText={formErrors.commitMoney}
                    defaultValue={form.commitMoney}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="דרישה כספית"
                    name="requireMoney"
                    type="number"
                    error={formErrors.requireMoney}
                    helperText={formErrors.requireMoney}
                    defaultValue={form.requireMoney}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מקום לימודים/עבודה"
                    name="yeshivaOrSeminar"
                    error={formErrors.yeshivaOrSeminar}
                    helperText={formErrors.yeshivaOrSeminar}
                    defaultValue={form.yeshivaOrSeminar}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עובד/לומד"
                    name="doingToday"
                    error={formErrors.doingToday}
                    helperText={formErrors.doingToday}
                    defaultValue={form.doingToday}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם האב"
                    name="fatherName"
                    error={formErrors.fatherName}
                    helperText={formErrors.fatherName}
                    defaultValue={form.fatherName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיסוק האב"
                    name="fatherDoing"
                    error={formErrors.fatherDoing}
                    helperText={formErrors.fatherDoing}
                    defaultValue={form.fatherDoing}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שם האם"
                    name="motherName"
                    error={formErrors.motherName}
                    helperText={formErrors.motherName}
                    defaultValue={form.motherName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עיסוק האם"
                    name="motherDoing"
                    error={formErrors.motherDoing}
                    helperText={formErrors.motherDoing}
                    defaultValue={form.motherDoing}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מוצא האב"
                    name="mozaAv"
                    error={formErrors.mozaAv}
                    helperText={formErrors.mozaAv}
                    defaultValue={form.mozaAv}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מוצא האם"
                    name="mozaEm"
                    error={formErrors.mozaEm}
                    helperText={formErrors.mozaEm}
                    defaultValue={form.mozaEm}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מס' אחים ואחיות"
                    name="siblings"
                    type="number"
                    error={formErrors.siblings}
                    helperText={formErrors.siblings}
                    defaultValue={form.siblings}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="סטטוס הורים"
                    name="parentStatus"
                    error={formErrors.parentStatus}
                    helperText={formErrors.parentStatus}
                    defaultValue={form.parentStatus}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="שיטה הלכתית"
                    name="halachaMethod"
                    error={formErrors.halachaMethod}
                    helperText={formErrors.halachaMethod}
                    defaultValue={form.halachaMethod}
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
                    error={formErrors.drishotSector}
                    helperText={formErrors.drishotSector}
                    defaultValue={form.drishotSector}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מראה כללי"
                    name="drishotLook"
                    error={formErrors.drishotLook}
                    helperText={formErrors.drishotLook}
                    defaultValue={form.drishotLook}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="תכונות אופי"
                    name="drishotCharacters"
                    error={formErrors.drishotCharacters}
                    helperText={formErrors.drishotCharacters}
                    defaultValue={form.drishotCharacters}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="ארץ מוצא מועדף"
                    name="drishotFavoriteMoza"
                    error={formErrors.drishotFavoriteMoza}
                    helperText={formErrors.drishotFavoriteMoza}
                    defaultValue={form.drishotFavoriteMoza}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="לא ממוצא"
                    name="drishotNotMoza"
                    error={formErrors.drishotNotMoza}
                    helperText={formErrors.drishotNotMoza}
                    defaultValue={form.drishotNotMoza}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מגיל"
                    name="fromAge"
                    type="number"
                    error={formErrors.fromAge}
                    helperText={formErrors.fromAge}
                    defaultValue={form.fromAge}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עד גיל"
                    name="mostAge"
                    type="number"
                    error={formErrors.mostAge}
                    helperText={formErrors.mostAge}
                    defaultValue={form.mostAge}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="מגובה"
                    name="fromHeight"
                    type="number"
                    error={formErrors.fromHeight}
                    helperText={formErrors.fromHeight}
                    defaultValue={form.fromHeight}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="עד גובה"
                    name="mostHeight"
                    type="number"
                    error={formErrors.mostHeight}
                    helperText={formErrors.mostHeight}
                    defaultValue={form.mostHeight}
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
                      defaultValue={form.casherPhone || false}
                      name="casherPhone"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="כן" />
                      <FormControlLabel value={false} control={<Radio />} label="לא" />
                    </RadioGroup>
                    {formErrors.casherPhone && <FormHelperText>{formErrors.casherPhone}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">האם בעל/ת רישיון?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={form.licence || false}
                      name="licence"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="כן" />
                      <FormControlLabel value={false} control={<Radio />} label="לא" />
                    </RadioGroup>
                    {formErrors.licence && <FormHelperText>{formErrors.licence}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">האם מעשן?</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue={form.smoking || false}
                      name="smoking"
                      onChange={handleChangeInput}
                    >
                      <FormControlLabel value={true} control={<Radio />} label="כן" />
                      <FormControlLabel value={false} control={<Radio />} label="לא" />
                    </RadioGroup>
                    {formErrors.smoking && <FormHelperText>{formErrors.smoking}</FormHelperText>}
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
                    error={formErrors.recommendName}
                    helperText={formErrors.recommendName}
                    //defaultValue={recomendForm.recommendName}
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="טלפון"
                    name="recommendPhone"
                    error={formErrors.recommendPhone}
                    helperText={formErrors.recommendPhone}
                    //defaultValue={recomendForm.recommendName}
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label="קרבה"
                    name="recommendRelative"
                    error={formErrors.recommendRelative}
                    helperText={formErrors.recommendRelative}
                    // defaultValue={recomendForm.recommendRelative}
                    onChange={handleChangeInputRecomended}
                  />
                </Grid>
                {form.recomendedPeople && form.recomendedPeople.map((recomend, index) => {
                  if (recomend.recommendRelative || recomend.recommendPhone || recomend.recommendName) {
                    return <Recomended key={index + 1} data={recomend} back={returnedBack} handleChange={handleChangeInputRecomended} />
                  }
                })}
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
                      defaultValue={inLawsForm.fatherInLawName}
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="טלפון"
                      name="fatherInLawPhone"
                      defaultValue={inLawsForm.fatherInLawPhone}
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="עיר"
                      name="fatherInLawCity"
                      defaultValue={inLawsForm.fatherInLawCity}
                      onChange={handleChangeInputInLaw}
                    />
                  </Grid>
                  {form.inLaws && form.inLaws.map((inLaw, index) => {
                    if (inLaw.fatherInLawName || inLaw.fatherInLawPhone || inLaw.fatherInLawCity) {
                      return <InLaws key={index + 1} data={inLaw} back={returnedBack} handleChange={handleChangeInputRecomended} />
                    }
                  })}
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
                    error={formErrors.fillQuestionarieName}
                    helperText={formErrors.fillQuestionarieName}
                    defaultValue={form.fillQuestionarieName}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label=" טלפון ממלא הטופס"
                    name="fillQuestionariePhone"
                    error={formErrors.fillQuestionariePhone}
                    helperText={formErrors.fillQuestionariePhone}
                    defaultValue={form.fillQuestionariePhone}
                    onChange={handleChangeInput}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    label=" קרבה למועמד"
                    name="fillQuestionarieRelative"
                    error={formErrors.fillQuestionarieRelative}
                    helperText={formErrors.fillQuestionarieRelative}
                    defaultValue={form.fillQuestionarieRelative}
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