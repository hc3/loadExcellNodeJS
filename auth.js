import AccountService from './src/modules/account/AccountService';
import Bcrypt from 'bcrypt';

var plugins = [
    {
        register: require('hapi-auth-jwt')
    }
];

exports.register = (server, options ,next) => {
    
  server.register(plugins,(err) => {

      if(err) throw err;

      const service = new AccountService(server.app.db.models.account);

      function validate(request, decodedToken, callback) {

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
        
      };

      server.auth.strategy('token', 'jwt', {
          key: process.env.SECRET,
          validateFunc: validate,
          verifyOptions: { algorithms: [ 'HS256' ] }  // only allow HS256 algorithm
      });

      next();
  })
}

exports.register.attributes = {
  name: 'authentication',
  version: '1.0.0'
}