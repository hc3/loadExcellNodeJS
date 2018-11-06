import AccountService from './AccountService';
import Account from './Account';

exports.register = function(server, options ,next) {

    const service = new AccountService(server.app.db.models.account);

    server.route({
        method: 'GET',
        path: '/accounts',
        config: {
            auth:'token',
            handler: (request, reply) => {

                if(action.isAuthorized(request, 'admin')) {
                    service.listAll(reply);
                } else {
                    service.notAuthorized(reply);
                }

            }
        }
    });

    server.route({
        method: 'POST',
        path: '/create-account',
        config: {
            auth:false,
            handler: (request, reply) => {
                service.create(request, reply);
            }
        }
    });

    server.route({
        method: 'PUT',
        path: '/accounts/{id}',
        config: {
            auth:'token',
             handler: (request, reply) => {

                if(service.isSameUser(request)) {
                    service.update(request, reply);
                } else {
                    service.notAuthorized(reply);
                }

            }
        }
    });

    server.route({
        method: 'GET',
        path: '/accounts/{id}',
        config: {
            auth:'token',
             handler: (request, reply) => {

                if(service.isSameUser(request)) {
                    service.findOne(request, reply);
                } else {
                    service.notAuthorized(reply);
                }

            }
        }
    });

    server.route({
        method:'PUT',
        path:'/active-user/{id}',
        config: {
            auth:false,
            handler:(request, reply) => {
                service.activeUser(request,reply,service);
            }
        }
    });

    return next();
}

exports.register.attributes = {
    name: 'account'
};