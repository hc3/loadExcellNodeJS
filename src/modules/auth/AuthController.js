import AuthService from './AuthService';
import Account from '../account/Account';

exports.plugin = {
    name:'login',
    version:'0.0.1',
    register: async function(server, options) {

        const service = new AuthService(server.app.db.models.account);

        server.route({
            method:'POST',
            path:'/login',
            config: {
                auth:false,
                handler: async (request, h) => {
                    return await service.createToken(request);
                }
            }
        });
    
        server.route({
            method:'POST',
            path:'/logout',
            handler:(request, h) => {
                service.deleteToken(request);
            }
        });
    }
}