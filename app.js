const express = require('express');
const app = express();
const port = 5000;
const loginController = require('./controller/logincontroller')
const cors = require('cors');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationMiddleWare = require('./middleware/authMiddleware');


app.use(express.json());
app.use(cors());
app.use(errorHandlerMiddleware)
app.use(express.static('./public'));

app.post('/api/v1/login', loginController.login)
app.get('/api/v1/dashboard',authenticationMiddleWare.authenticationMiddleWare, loginController.dashboard)


app.use(notFoundMiddleware)

app.listen(port, ()=>{
        console.log(`Server is connected at port: ${port}`); 
 })
