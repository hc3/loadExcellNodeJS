import factory from './AbstractFactory';

class AbstractDAO {

    constructor(Model) {
        this.Model = Model;
    };

    listAll(success,error) {factory.executeFind(this.Model, success, error);};

    listById(id,success,error) {factory.executeFindOne(this.Model, id, success, error);};

    create(data,success,error) {factory.executeCreate(this.Model,data,success,error);};

    remove(id,success,error) {
        const query = {_id:id};
        this.Model.remove(query)
            .then(success)
            .catch(error);
    };

    update(data,success,error) {factory.executeFindAndUpdate(this.Model,data,success,error);};
}

export default AbstractDAO;