import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import './App.css';


function App() {

  const connectedUser = useSelector(state => state.user.currentUser);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FillQuestionnaire" element={<FillQuestionnaire />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ManagerPage" element={ connectedUser && connectedUser.role === "manager" ? <ManagerPage />: <Navigate to="/login" /> } /> 
          <Route path="/SearchAndMatch" element={connectedUser ? <SearchAndMatch /> : <Navigate to="/login" />} />
          <Route path="/StatisicsClosedMatchMakked" element={connectedUser && connectedUser.role === "manager"  ? <StatisicsClosedMatchMakked /> : <Navigate to="/login" />} />
          <Route path="/PersonalArea" element={connectedUser && connectedUser.role === "matchmaker" ? <PersonalArea /> : <Navigate to="/login" />} />
          <Route path="/MatchMakerPage" element={connectedUser && connectedUser.role === "matchmaker" ? <MatchMakerPage /> : <Navigate to="/login" />} /> 
          <Route path="/CheckingNews" element={connectedUser && connectedUser.role === "manager" ? <CheckingNewRegistered /> : <Navigate to="/login" />} />
          <Route path="/CloseMatch" element={connectedUser && connectedUser.role === "matchmaker" ? <CloseMatch /> : <Navigate to="/login" />} />
          <Route path="/Engaged" element={<Engaged />} />
          <Route path="/CloseEngagedPage" element={<CloseEngagedPage />} />
          <Route path="/ShowMessages" element={connectedUser && connectedUser.role === "manager" ?  <ShowMessages /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
