import SellDAO from './SellDAO';
import AbstractService from '../AbstractService';
import SellFactory from './SellFactory';
import success from '../common/success';
import error from '../common/error';

class SellService extends AbstractService {

    constructor(Sell) {
        super(new SellDAO(Sell));
        this.sellDAO = new SellDAO(Sell);
    }

    import(request, reply) {
        
    }
}