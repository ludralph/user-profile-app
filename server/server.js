import express from 'express';
import devBundle from './devBundle';
import path from 'path';
import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', () =>{
    throw new Error(`Unable to connect to database ${ mongoUri}`)
})

if (process.env.NODE_ENV === 'development'){
    devBundle.compile(app);
}


app.listen(config.port, function onStart(err){
    if (err){
        console.log(err)
    }
    console.info('Server started on port %s.', config.port  )
})