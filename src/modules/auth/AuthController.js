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
            handler:(request, reply) => {
                service.createToken(request,reply);
            }
        });
    
        server.route({
            method:'POST',
            path:'/logout',
            handler:(request, reply) => {
                service.deleteToken(request,reply);
            }
        });
    }
}