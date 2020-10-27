const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./services/errorHandler');
const AppError = require('./services/errorUtil');
const accessEnv = require('./services/accessEnv');
const uploadRouter = require('./routes/uploadRoutes');

const app = express();
const port = accessEnv('PORT') || 3000    

app.use(       
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
          "X-Password-Expired",
          "Access-Control-Allow-Methods", 'POST,GET,OPTIONS,PUT,DELETE'
        ],
        optionsSuccessStatus: 200
    })
);


app.use(bodyParser.json())   
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/v1/image', uploadRouter);


app.use("*", (req, res, next)=>{
    next(new AppError("Route doesn't exists", "400"))
})

app.use(globalErrorHandler);

app.listen(port, ()=>{
    console.log('::listening on port ', port)
})

//sudo docker run --name finessecode --env-file .env -p 4000:4000 -v `pwd`:/user/src/app finessecode

