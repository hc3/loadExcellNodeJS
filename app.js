'use strict';
import Hapi from 'hapi';
import db from './src/modules/config/db';

const server = new Hapi.Server();

server.app.db = db;

// ### --- START SERVER --- ### 
const controllers = [
    require('./auth'),
    require('./src/modules/account/AccountController')
    //require('./src/modules/auth/AuthController'),
    //require('./src/modules/sell/SellController')
]

async function register() {
    
    try {
        await server.register(controllers);
    } catch(err) {
        console.log('err: ',err);
        process.exit(1);
    }
}

//register();

export default register();