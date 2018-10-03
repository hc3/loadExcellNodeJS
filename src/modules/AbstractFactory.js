function executeFindAndUpdate(InstanceModel, data, sucess, error) {
    InstanceModel.findOneAndUpdate({ _id: data._id }, data)
        .then(sucess)
        .catch(error)

};

function executeCreate(InstanceModel, data, success, error) {
    InstanceModel.create(data)
        .then(success)
        .catch(error)
}

function executeFind(InstanceModel,success, error) {
    InstanceModel.find()
        .exec()
        .then(success)
        .catch(error);
}

function executeFindOne(InstanceModel, id, success, error) {
    InstanceModel.findOne({_id:id})
        .exec()
        .then(success)
        .catch(error);
}

const factory = {
    executeFindAndUpdate,
    executeCreate,
    executeFind,
    executeFindOne
}