import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import FillQuestionnaire from './Components/Forms/FillQuestionnaire/FillQuestionnaire';
import HomePage from './Components/HomePage/HomePage';
import ManagerPage from './Components/ManagerPage/ManagerPage';
import SearchAndMatch from './Components/SearchAndMatch/SearchAndMatch';
import StatisicsClosedMatchMakked from './Components/StatisicsClosedMatchMakked/StatisicsClosedMatchMakked';
import PersonalArea from './Components/PersonalArea/PersonalArea';
import MatchMakerPage from './Components/MatchMakerPage/MatchMakerPage';
import CheckingNewRegistered from './Components/CheckingNewRegistered/CheckingNewRegistered';
import CloseMatch from './Components/CloseMatch/CloseMatch';
import Engaged from './Components/Engaged/Engade';
import CloseEngagedPage from './Components/CloseEngagedPage/CloseEngagedPage';
import SendEmail from './Components/SendMail/SendMail';
import ShowMessages from './Components/ShowMessages/ShowMessages';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/FillQuestionnaire" element={<FillQuestionnaire />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ManagerPage" element={<ManagerPage />} />
        <Route path="/SearchAndMatch" element={<SearchAndMatch />} />
        <Route path="/StatisicsClosedMatchMakked" element={<StatisicsClosedMatchMakked />} />
        <Route path="/PersonalArea" element={<PersonalArea />} />
        <Route path="/MatchMakerPage" element={<MatchMakerPage />} />
        <Route path="/CheckingNewRegistered" elemeFnt={<CheckingNewRegistered />} />
        <Route path="/CloseMatch" element={<CloseMatch />} />
        <Route path="/Engaged" element={<Engaged />} />
        <Route path="/CloseEngagedPage" element={<CloseEngagedPage />} />
        <Route path="/SendEmail" element={<SendEmail />} />
        <Route path="/ShowMessages" element={<ShowMessages />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
