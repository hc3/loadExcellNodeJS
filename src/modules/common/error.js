 let errorMessage = {
   message:'',
   error:true
 };

export default (reply) => (err) => {

  console.log("ERROR ON /ACTIONS/ERROR.JS =>",err);

  if(err) {

    if(err.errors) {

      Object.keys(err.errors).map((key, index) => {
        if(err.errors[key]) {
          errorMessage.message = err.errors[key].message;
          return reply(errorMessage);
        } else {
          errorMessage.message = "Erro desconhecido.";
          return reply(errorMessage);
        }
      })

    } else if(err.code === 11000) {
      var regex = /: { : (.*) }/
      const duplicatedValue = err.message.match(regex);
      errorMessage.message = "O valor "+duplicatedValue[1]+" já está cadastrado no sistema!";
      return reply(errorMessage);
    }
    
  } 
  
}