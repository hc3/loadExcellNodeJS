import factory from './AbstractFactory';

class AbstractDAO {

    constructor(Model) {
        this.Model = Model;
    };

    listAll(success,error) {
        /*
        factory.executeFind(this.Model, success, error);
        */
        this.Model.find()
            .exec()
            .then(success)
            .catch(error);
    };

    listById(id,success,error) {
        /*
        factory.executeFindOne(this.Model, id, success, error);
        */
        const query = {_id:id};
        this.Model.findOne(query)
            .exec()
            .then(success)
            .catch(error);
    };

    create(data,success,error) {
        /*
        factory.executeCreate(this.Model,data,success,error);
        */
        this.Model.create(data)
            .then(success)
            .catch(error);
    };

    remove(id,success,error) {
        const query = {_id:id};
        this.Model.remove(query)
            .then(success)
            .catch(error);
    };

    update(data,success,error) {
        /*
        factory.executeFindAndUpdate(this.Model,data,success,error);
       */
        const query = {_id:data._id};
        this.Model.findOneAndUpdate({_id:data._id},data)
            .then(success)
            .catch(error);
    };
}

export default AbstractDAO;