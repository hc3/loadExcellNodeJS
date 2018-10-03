'use strict';
import Hapi from 'hapi';
import db from './src/modules/config/db';

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 , routes:{ cors:true } });
server.app.db = db;

// ### --- START SERVER --- ### 
const controllers = [
    require('./auth'),
    require('./src/modules/account/AccountController'),
    require('./src/modules/auth/AuthController'),
    require('./src/modules/driver/DriverController'),
    require('./src/modules/vehicle/VehicleController'),
    require('./src/modules/product/ProductController')
]

server.register(controllers , (err) => {

    if(err) { throw err }

})

export default server;