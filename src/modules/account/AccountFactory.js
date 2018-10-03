function createNewAccount(object) {

    return {
        username: object.username,
        fullName: object.fullName,
        email: object.email,
        role: object.role,
        isActive: object.isActive
    }


};

function updateAccount(object) {

    if(object.password) {
        return {
            _id: object._id,
            fullName:object.fullName,
            username:object.username,
            email:object.email,
            password:object.password,
            role:object.role,
            isActive:object.isActive
        }
    } else {        
        return {
            _id: object._id,
            fullName:object.fullName,
            username:object.username,
            email:object.email,
            role:object.role,
            isActive:object.isActive
        }
    }

};

function executeFindAndUpdate(InstanceModel, account, sucess, error) {
    // adicionar uma promisse aqui
    InstanceModel.findOneAndUpdate({ _id: account._id }, account)
        .then(sucess)
        .catch(error)

};

function executeCreate(InstanceModel, account, success, error) {
    InstanceModel.create(account)
        .then(success)
        .catch(error)
}

const factory = {
    createNewAccount,
    updateAccount,
    executeFindAndUpdate,
    executeCreate
}

export default factory;