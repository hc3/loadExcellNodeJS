import success from './common/success';
import error from './common/error';

async function executeFindAndUpdate(InstanceModel, data) {
    try {
        const response = await InstanceModel.findOneAndUpdate({ _id: data._id }, data);
        return await success(response);
    } catch(exception) {
        return await error(exception)
    }
    

};

async function executeCreate(InstanceModel, data) {
    try {
        const response = await InstanceModel.create(data);
        return await success(response);
    } catch(exception) {
        return await error(exception)
    }
}

async function executeFind(InstanceModel) {
    try {
        const response = await InstanceModel.find();
        return await success(response);
    } catch(exception) {
        return await error(exception)
    }
}

async function executeFindOne(InstanceModel, id) {
    try {
        const response = await InstanceModel.findOne({_id:id});
        return await success(response);
    } catch(exception) {
        return await error(exception)
    }
}

const factory = {
    executeFindAndUpdate,
    executeCreate,
    executeFind,
    executeFindOne
}

export default factory;