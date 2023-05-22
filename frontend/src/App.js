import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import Post_job from './components/Post_job';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import Search_Results from './components/Search_Results';
import EditProfile from './components/EditProfile';
import Chat from './components/Chat/Chat';
import EmailVerify from './components/EmailVerify';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from "./components/PasswordReset";
import MyJobs from "./components/MyJobs";
import Post_Resources from "./components/Post_Resources"
import Resources from "./components/Resources"
import Post_Internship from "./components/Post_Internship"
import Internship from "./components/Internship"

function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main/>}/>}
      {user && <Route path = "/jobs" exact element={<Jobs/>}/>}
      {user && <Route path = "/profile" exact element={<Profile/>}/>}
      {user && <Route path = "/EditProfile" exact element={<EditProfile/>}/>}
      {user && <Route path = "/postjob" exact element={<Post_job/>}/>}
      {user && <Route path = "/myjobs" exact element={<MyJobs/>}/>}
      {user && <Route path = "/search_results" exact element={<Search_Results/>}/>}
      {user && <Route path = "/post_resources" exact element={<Post_Resources/>}/>}
      {user && <Route path = "/resources" exact element={<Resources/>}/>}
      {user && <Route path = "/post_internship" exact element={<Post_Internship/>}/>}
      {user && <Route path = "/internship" exact element={<Internship/>}/>}
      
      <Route path ="/login" exact element={<Login/>}/>
      <Route path ="/signup" exact element={<Signup/>}/>
      
      <Route path="/" exact element={<Navigate replace to="/signup"/>}/>
      <Route path="/postjob" exact element={<Navigate replace to="/signup"/>}/>
      <Route path="/profile" exact element={<Navigate replace to="/signup"/>}/>
      <Route path="/edit_profile" exact element={<Navigate replace to="/signup"/>}/>
      <Route path="/jobs" exact element={<Navigate replace to="/signup"/>}/>
      
      <Route path="/search_results" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/postjob" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/myjobs" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/profile" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/jobs" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/chat" element={user ? <Chat /> : <Navigate to="../login" />}/>
      <Route path="/resources" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/post_resources" exact element={<Navigate replace to="/login"/>}/>
      <Route path="/users/:id/verify/:token" element={<EmailVerify/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/chat/:conversationID" element={<Chat />} />


    </Routes>
  );
}
export default App;

