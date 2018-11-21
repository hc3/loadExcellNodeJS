'use strict';
import Hapi from 'hapi';
import db from './src/modules/config/db';

const server = new Hapi.Server({ port:3000 });

server.app.db = db;

// ### --- START SERVER --- ### 
const controllers = [
    require('./auth'),
    require('./src/modules/account/AccountController'),
    require('./src/modules/auth/AuthController')
    //require('./src/modules/sell/SellController')
]

const init = async () => {
    try {
        await server.register(controllers);
        await server.start();
        console.log('Server running at: ' + server.info.uri );
    } catch(err) {
        console.log('err: ',err);
        process.exit(1);
    }

}

const stop = async () => {
    try {
        await server.stop();
    } catch(err) {
        console.log('err: ',err);
        process.exit(1);
    }
}

init();
export default server;