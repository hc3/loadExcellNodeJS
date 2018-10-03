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
    unique: true
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

InstanceSchema
  .path('email')
  .validate(function (value) {
    var self = this;
    return this.constructor.findOne({ email: toLower(value) })
      .then(function (user) {
        if (user) {
          if (self._id === user._id) {
            return true;
          }
          return false;
        }
        return true;
      })
      .catch(function (err) {
        throw err;
      });
  }, 'esse E-mail já está em uso.');

InstanceSchema
  .path('username')
  .validate(function (value) {
    var self = this;
    return this.constructor.findOne({ username: toLower(value) })
      .then(function (user) {
        if (user) {
          if (self._id === user._id) {
            return true;
          }
          return false;
        }
        return true;
      })
      .catch(function (err) {
        throw err;
      });
  }, 'esse usuário já está em uso.');


InstanceSchema

  .pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      })
    })

  })
  .pre('findOneAndUpdate', function (next) {

    var user = this;

    if (user.getUpdate().password) {

      user.findOne({ "_id": user.getUpdate()._id }, function (err, doc) {

        if (doc.password != user.getUpdate().password) {

          bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {

            if (err) return next(err);

            bcrypt.hash(user.getUpdate().password, salt, function (err, hash) {

              if (err) return next(err);

              user.getUpdate().password = hash;

              next();

            })
          })

        }

        next();

      })
    } else {
      next()
    }

  });

InstanceSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model('account', InstanceSchema);