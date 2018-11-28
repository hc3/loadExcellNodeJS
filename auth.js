import AccountService from './src/modules/account/AccountService';

exports.plugin  = {
  name:'auth',
  version:'0.0.1',
  register: async function(server,options) {

      const service = new AccountService(server.app.db.models.account);

      const validate = async function(decoded, request, h) {
        
        const response = await service.listById(decoded.id);
        if(!response._id) {
          return h.response({message:'invalid token'}).code(401);
        } else {
          return {isValid:true,credentials:response};
        }
      }
      
      await server.register(require('hapi-auth-jwt2'));

      server.auth.strategy('jwt', 'jwt', {
          key: process.env.SECRET,
          validate: validate,
          verifyOptions: { algorithms: [ 'HS256' ] }
      });

      server.auth.default('jwt');
  }

}