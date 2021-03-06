import AccountService from './AccountService';
import Account from './Account';
import Boom from 'boom';

exports.plugin = {
    name:'account',
    version:'0.0.1',
    register: async function(server, options) {

        const service = new AccountService(server.app.db.models.account);

        server.route({
            method: 'GET',
            path: '/accounts',
            config: {
                auth:'jwt',
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
            options: {
                auth:false,
                handler: async (request, h) => {
                    try {
                        const response = await service.create(request);
                        return response;
                    } catch(exception) {
                        throw Boom.notFound(exception);
                    }
                }
            }
        });
    
        server.route({
            method: 'PUT',
            path: '/update-account/{id}',
            config: {
                auth:'jwt',
                 handler: async (request, h) => {
                    try {

                        if(service.isSameUser(request)) {
                            const response = await service.update(request);
                            return response;
                        } else {
                            return service.notAuthorized();
                        }

                    } catch(exception) {
                        throw Boom.notFound(exception);
                    }
                
                }
            }
        });
    
        server.route({
            method: 'GET',
            path: '/accounts/{id}',
            config: {
                auth:'jwt',
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
    
    }
}