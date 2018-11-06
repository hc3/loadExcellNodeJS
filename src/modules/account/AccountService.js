import AccountDAO from './AccountDAO';
import AbstractService from '../AbstractService';
import AccountFactory from './AccountFactory';
import success from '../common/success';
import error from '../common/error';

class AccountService extends AbstractService {

    constructor(Account) {
        super(new AccountDAO(Account));
        this.accountDAO = new AccountDAO(Account);
    };

    update(request, reply) {

        let account = AccountFactory.updateAccount(request.payload);

        return this.accountDAO.update(account, success(reply), error(reply));

    }

    activeUser(data, success, error) { return this.accountDAO.activeUser(data.params.id, success, error); }

    create(request, reply) {

        let account = AccountFactory.createNewAccount(request.payload);

        return this.accountDAO.create(account, success(reply), error(reply));

    };

    //findByDecodedToken(id, success, error) { return this.accountDAO.listById(id, success, error); };

}

export default AccountService;