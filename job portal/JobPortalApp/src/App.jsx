import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

import AppliedJobs from './components/AppliedJobs';
import Userprofile from './components/Userprofile';
import BrowseJob from './components/BrowseJob';
import ManageJobs from './components/ManageJobs';
import AddJob from './components/AddJob';
import UserApplication from './components/UserApplication';
import {SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import Admindb from './components/Admindb';
import Userdb from './components/Userdb';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn } = useAuth(); // Check if the user is signed in

  if (!isSignedIn) {
    // Redirect to the login page if the user is not signed in
    return <Navigate to="/login" />;
  }

  // Render the protected component if the user is signed in
  return children;
};

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element ={<Navbar/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<SignIn />} />

        <Route path='/admindb'
         element={ 
         <ProtectedRoute>
              <Admindb />
            </ProtectedRoute>} >
            <Route path='managejobs' element={<ManageJobs />} />
            <Route path='addJob' element={<AddJob />} />
            <Route path='applications' element={<UserApplication />} />
        </Route>

        <Route path='/userdb'
         element={
          <ProtectedRoute>
          <Userdb />
        </ProtectedRoute>
        } >
            <Route path='appliedjobs' element={<AppliedJobs />} />
            <Route path='userprofile' element={<Userprofile />} />
            <Route path='browse' element={<BrowseJob />} />
        </Route> 
        
      </Routes>
    </>
  );
}

export default App;

