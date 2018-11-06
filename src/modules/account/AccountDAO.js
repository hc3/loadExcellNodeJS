import AbstractDAO from '../AbstractDAO';
import AccountFactory from './AccountFactory';

class AccountDAO extends AbstractDAO {

    constructor(Account) {
        super(Account);
        this.account = Account;
    };

    update(account, success, error) { AccountFactory.executeFindAndUpdate(this.account, account, success, error); }

    activeUser(id, success, error) { this.account.findOneAndUpdate({ _id:id},{isActive:true}).then(success).catch(error).done() }

    create(account, success, error) { AccountFactory.executeCreate(this.account, account, success, error); };

    listById(id, success, error) {
        const query = { _id: id };
        const removedFields = { password: 0 }
        this.account.findOne(query, removedFields)
            .exec()
            .then(success)
            .catch(error);
    };
    
    listAll(success, error) { this.account.find().select("-password").exec().then(success).catch(error); };

}

export default AccountDAO;