const express = require('express');
const ejs = require('ejs')
const path=require('path')
const routes = require('./Routes/userRoutes')
const cors = require('cors');
const {db_connect}= require('./db_config/index')
const bodyParser = require('body-parser');
const app = express();

const version = 'aa';


(() => {
    configur_db(); //for connecting database when it comes in use
    configur_cors();
    configur_parser();
    publicDir();
    configur_routes();
    // Error Handeling
    error404();
    globalErrorHandler();
})()


function configur_cors() {
    app.use(cors())
}

function configur_parser() {

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
}


function configur_db(){
    db_connect();
}

function publicDir(){
    app.use(express.static(path.resolve('./Storage/uploadImages')));
}

function configur_routes() {
    app.use(`/api/${version}/template`, routes)
}





function error404() {
    app.use((req, res) => {
        res.status(404).send({
            status: 404,
            msg: 'NOT FOUND'
        })
    })
}

function globalErrorHandler() {

    app.use((err, req, res, next) => {
        res.status(500).send({
            msg: err.message || 'Somthing went wrong. Please try again later',
            status: 500
        })
    })

}


module.exports = app