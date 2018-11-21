import AccountService from './AccountService';
import Account from './Account';

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
                        console.log('exception: ',exception);
                        throw Boom.notFound(exception);
                    }
                }
            }
        });
    
        server.route({
            method: 'PUT',
            path: '/accounts/{id}',
            config: {
                auth:'jwt',
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