const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let ReptileModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ReptileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  description: {
    type: String,
    min: 0,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

//sends reptile data in a doc to the API
ReptileSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  description: doc.description,
});

//finds all the reptiles an certain user has
ReptileSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return ReptileModel.find(search).select('name age description').lean().exec(callback);
};

ReptileModel = mongoose.model('Reptile', ReptileSchema);

module.exports.ReptileModel = ReptileModel;
module.exports.ReptileSchema = ReptileSchema;
