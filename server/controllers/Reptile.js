const models = require('../models');

const { Reptile } = models;

const makerPage = (req, res) => {
  Reptile.ReptileModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), reptiles: docs });
  });
};

const makeReptile = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.description) {
    return res.status(400).json({ error: 'Name, age, and description are required' });
  }

  const reptileData = {
    name: req.body.name,
    age: req.body.age,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newReptile = new Reptile.ReptileModel(reptileData);

  const reptilePromise = newReptile.save();

  reptilePromise.then(() => res.json({ redirect: '/maker' }));

  reptilePromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Reptile already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return reptilePromise;
};

const getReptiles = (request, response) => {
  const req = request;
  const res = response;

  return Reptile.ReptileModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ reptiles: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getReptiles = getReptiles;
module.exports.make = makeReptile;
