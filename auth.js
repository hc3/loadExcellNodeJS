import AccountService from './src/modules/account/AccountService';

exports.plugin  = {
  name:'auth',
  version:'0.0.1',
  register: async function(server,options) {

      const service = new AccountService(server.app.db.models.account);

      const validate = async function(decoded, request) {

        let err = "";
        
        function success(user) {
          if (!user) {
              err = "usuário não encontrado";
              return callback(err, false, user);
          }
          return callback(err, true, user);
        };

        function error(error) {
          return error;
        };
        
        service.listById(decodedToken.id,success,error);

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