import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const InstanceSchema = new Schema({
    number: {
        type:String,
        require:true
    },
    romaneio: {
        type:String,
        require:true
    },
    client: {
        type:String,
        require:true
    },
    salesman: {
        type:String,
        require:true
    },
    billingType: {
        type:Number,
        require:true
    },
    paymentTerms: {
        type:Number,
        require:true
    },
    sequence: {
        type:String,
        require:true
    },
    product: {
        type:String,
        require:true,
    },
    family: {
        type:String,
        require:true
    },
    familySequence: {
        type:String,
        require:true
    }
}, {
    timestamps: true
  });

export default mongoose.model('sell',InstanceSchema);