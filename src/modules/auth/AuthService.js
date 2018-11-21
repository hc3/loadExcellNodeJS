import jwt from 'jwt-simple';

async function successToken(data, user) {
  let resposta = {err:true,message:'no tokens'}

  if(user) {

    const isMath = await user.comparePassword(data.password);
  
    if(isMath) {
  
      const payload = {
        id:user._id,
        email:user.email,
        role:user.role,
        isActive:user.isActive
      };
  
      resposta = {
        token:jwt.encode(payload,process.env.SECRET ),
        idUser:user._id,
        role:user.role,
        isActive:user.isActive
      }
  
    } 

  } 

  return resposta;
};

const errorToken = () => {err:"no tokens"};


class AuthService {
  
  constructor(Model) {
    this.model = Model;
  }

  async createToken(request) {

    const email = request.payload.email;
    const password = request.payload.password;

    if(email && password) {

      const query = {
        "email":email
      };

      return this.model.findOne(query)
        .exec()
        .then((user) =>  {
          return successToken(request.payload, user);
        })
        .catch(errorToken());

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