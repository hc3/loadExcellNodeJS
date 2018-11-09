import SellService from './SellService';
import Sell from './Sell';

exports.register = function(server, options, next) {

    const service = new SellService(server.app.db.models.sell);

    server.route({
        method:'POST',
        path:'/import-sells',
        config: {
            handler: (request, reply) => {
                
            }
        }
    })
};

exports.register.attributes = {
    name: 'sells'
}