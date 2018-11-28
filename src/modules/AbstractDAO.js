import factory from './AbstractFactory';

class AbstractDAO {

    constructor(Model) {
        this.Model = Model;
    };

    listAll() { return factory.executeFind(this.Model);};

    listById(id) { return factory.executeFindOne(this.Model, id); };

    create(data) { return factory.executeCreate(this.Model,data);};

    remove(id) {
        const query = {_id:id};
        this.Model.remove(query)
            .then(success)
            .catch(error);
    };

    update(data) { return factory.executeFindAndUpdate(this.Model,data);};
}

export default AbstractDAO;