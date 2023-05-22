require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./database');
const path = require('path');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const UserInfoRoutes = require('./routes/user_info');
const UserProfileRoutes = require('./routes/userProfile');
const passwordResetRoutes = require("./routes/passwordReset");
const myjobsRoutes = require("./routes/myjobs");
const getCurrentUserRoutes = require("./routes/getCurrentUser");
const getCurrentUserIDRoutes = require("./routes/getCurrentUserID");
const getUserRoutes = require("./routes/getUser");
const jobRoutes = require('./routes/jobs');
const MessageRoute = require('./routes/MessageRoute');
const ChatRoute = require('./routes/ChatRoute');
const userName = require('./routes/getUsername');
const resourcesRoutes = require('./routes/resources');
const Proposal = require('./routes/proposal');
const internshipRoutes = require('./routes/internships');


//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/user_info',UserInfoRoutes);
app.use('/api/message', MessageRoute);
app.use('/api/chat', ChatRoute);
app.use('/api/userProfile', UserProfileRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/myjobs', myjobsRoutes);
app.use('/api/getcurrentuser', getCurrentUserRoutes);
app.use('/api/internships', internshipRoutes);

app.use('/api/getcurrentuserID', getCurrentUserIDRoutes);
app.use('/api/getuser', getUserRoutes);
app.use('/api/images', express.static(path.join(__dirname,'images')));

app.use('/api/getUsername', userName)

app.use('/api/getUsername', userName);
app.use('/api/resources', resourcesRoutes);

app.use('/api/proposal', Proposal);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))