import jwt from 'jwt-simple';

const successToken = (reply, data) => (user) => {

  user.comparePassword(data.password, (isMath) => {

    if(isMath) {

      const payload = {
        id:user._id,
        email:user.email,
        role:user.role,
        isActive:user.isActive
      };

      let resposta = {
        token:jwt.encode(payload,process.env.SECRET ),
        idUser:user._id,
        role:user.role,
        isActive:user.isActive
      }

      reply(resposta);

    } else{
      reply("no tokens");
    }
  });
}

const errorToken = (reply) => () => reply({err:"no tokens"});


class AuthService {
  
  constructor(Model) {
    this.model = Model;
  }

  createToken(request, reply) {

    const email = request.payload.email;
    const password = request.payload.password;

    if(email && password) {

      const query = {
        "email":email
      };

      this.model.findOne(query)
        .then(successToken(reply, request.payload))
        .catch(errorToken(reply));

    } else {
      return error("usuário ou senha incorretos");
    }
  };

  getToken() {
    return {texto:'to aqui'}
  }

  removeToken() {
    
  }
}

export default AuthService;