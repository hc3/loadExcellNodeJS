import AbstractDAO from '../AbstractDAO';
import AccountFactory from './AccountFactory';

class AccountDAO extends AbstractDAO {

    constructor(Account) {
        super(Account);
        this.account = Account;
    };

    update(account) { return AccountFactory.executeFindAndUpdate(this.account, account); }

    activeUser(id, success, error) { this.account.findOneAndUpdate({ _id:id},{isActive:true}).then(success).catch(error).done() }

    create(account) { return AccountFactory.executeCreate(this.account, account); };

    listOne(id, success, error) {
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