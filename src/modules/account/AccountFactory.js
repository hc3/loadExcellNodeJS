import success from '../common/success';
import error from '../common/error';

function createNewAccount(object) {

    return {
        username: object.username,
        fullName: object.fullName,
        email: object.email,
        role: object.role,
        isActive: object.isActive,
        password:object.password
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

async function executeFindAndUpdate(InstanceModel, account) {
    try {
        const response = await InstanceModel.findOneAndUpdate({ _id: account._id }, account);
        return await success(response);
    } catch(exception) {
        return await error(exception)
    }
};

async function executeCreate(InstanceModel, account) {
    try {
        const response = await InstanceModel.create(account)
        return await success(response)
    } catch(exception) {
        return await error(exception)
    }
}

const factory = {
    createNewAccount,
    updateAccount,
    executeFindAndUpdate,
    executeCreate
}

export default factory;