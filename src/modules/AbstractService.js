import success from './actions/success';
import error from './actions/error';
import jwt from 'jwt-simple';

class AbstractService {

    constructor(DAO) {
        this.DAO = DAO;
    };

    listAll(reply) {
        return this.DAO.listAll(success(reply), error(reply));
    };

    findOne(request, reply) {
        const id = request.params.id;

        return this.DAO.listById(id, success(reply), error(reply));
    }

    listById(id, reply) {
        return this.DAO.listById(id, success(reply), error(reply));
    };

    create(data, reply) {
        return this.DAO.create(data.payload, success(reply), error(reply));
    };

    remove(id, success, error) {
        return this.DAO.remove(id, success, error);
    };

    update(data, reply) {
        return this.DAO.update(data.payload, success(reply), error(reply));
    };

    notAuthorizared(res) {

        let message = {
            error: true,
            message: 'Usuário não tem autorização para acessar'
        };

        return res(message);

    };

    isAuthorized(req, type) {

        let isAuthorized = false;

        const role = req.auth.credentials.role;

        if (role === type || role === 'admin') {
            isAuthorized = true;
        }

        return isAuthorized;
    }

    isSameUser(req) {

        let isSameUser = false;

        const role = req.auth.credentials.role;

        if(role === 'admin') {

            isSameUser = true;

        } else {

            const token = req.headers.authorization.replace("Bearer ","");
            const id = req.auth.credentials.id;

            var decodedToken = jwt.decode(token, process.env.SECRET);

            if(decodedToken.id === id) {
                isSameUser = true;
            };

        };

        return isSameUser;
    }

}

export default AbstractService;