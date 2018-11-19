 let errorMessage = {
   message:'',
   error:true
 };

export default (err) => {

  console.error("ERROR ON /ACTIONS/ERROR.JS =>",err);

  if(err) {

    if(err.errors) {

      Object.keys(err.errors).map((key) => {
        if(err.errors[key]) {
          errorMessage.message = err.errors[key].message;
        } else {
          errorMessage.message = "Erro desconhecido.";
        }
      })

    } else if(err.code === 11000) {
      var regex = /: { : (.*) }/
      const duplicatedValue = err.message.match(regex);
      errorMessage.message = "O valor "+duplicatedValue[1]+" já está cadastrado no sistema!";
    }

  } 
  return errorMessage;

}