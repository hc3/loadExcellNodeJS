import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

function toLower(v) {

  if (!v) return

  return v.toLowerCase();
}

const InstanceSchema = new Schema({
  fullName: {
    type: String
  },
  username: {
    type: String,
    set: toLower,
    get: toLower,
    require: true,
    unique: true
  },
  email: {
    type: String,
    set: toLower,
    get: toLower,
    require: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: async function (value) {
        const self = this;
        const query = { email: toLower(value) };
        const exist = await verifyIfFieldAlreadExist(query, self, this.constructor);
        return !exist;
      },
      message: 'esse E-mail já está em uso.'
    }
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    enum: ['admin', 'logistics', 'financial'],
    require: true
  },
  isActive: {
    type: Boolean,
    require: true,
    default: false
  }
}, {
    timestamps: true
  });

/*
InstanceSchema
.path('email')
.validate();
*/
/*
InstanceSchema
  .path('username')
  .validate(async function (value) {
    var self = this;
    const query = { username: toLower(value) };
    const exist = await verifyIfFieldAlreadExist(query, self, this.constructor);
    return exist;
  }, 'esse usuário já está em uso.');
*/

InstanceSchema
  .pre('save', async function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    try {
      user.password = await generateHash(user.password);
    } catch (exception) {
      next(exception);
    }
  })
  .pre('findOneAndUpdate', async function (next) {
    const user = this;
    if (user.getUpdate().password) {
      try {
        const findedUser = await user.findOne({ _id: user.getUpdate()._id });
        if (findedUser.password != user.getUpdate().password) {
          user.getUpdate().password = await generateHash(user.getUpdate().password);
          next();
        }
      } catch (exception) {
        next(exception);
      }
    } else {
      next()
    }
  });

InstanceSchema.methods.comparePassword = async function (candidatePassword) {
  const isEqual = await bcrypt.compareSync(candidatePassword, this.password);
  return isEqual;
};

async function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) reject(err);
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      })
    })
  })
};

async function verifyIfFieldAlreadExist(query, self, constructor) {
  try {
    let exist = false;
    const user = await constructor.findOne(query);
    if (user) {
      if (user._id === self._id) {
        exist = true;
      }
    }
    return exist;
  } catch (exception) {
    console.log('exception : ', exception);
    throw new Error(exception);
  }
}

export default mongoose.model('account', InstanceSchema);