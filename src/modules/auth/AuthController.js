import AuthService from './AuthService';
import Account from '../account/Account';

exports.register = function(server, options, next) {

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

    return next();
};

exports.register.attributes = {
    name: 'routes-auth'
};