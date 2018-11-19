import AbstractDAO from '../AbstractDAO';
import SellFactory from './SellFactory';

class SellDAO extends AbstractDAO {

    constructor(Sell) {
        super(Sell);
        this.sell = Sell;
    }

}