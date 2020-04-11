const models = require('../models');

const { Domo } = models;

const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.treats) {
    return res.status(400).json({ error: 'Name, age, and treats are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    treats: req.body.treats,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  const domoPromise = newDomo.save();

  domoPromise.then(() => res.json({ redirect: '/maker' }));

  domoPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return domoPromise;
};

const getDomos = (request, response) => {
  const req = request;
  const res = response;

  return Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ domos: docs });
  });
};

const getHungriestDomo = (request, response) => {
  const res = response;

  return Domo.DomoModel.find({}).sort({ treats: 1 }).exec((err, docs) => {
    const hungriestDomo = docs[0];
    return res.send({ domos: [hungriestDomo] });
  });
};

module.exports.makerPage = makerPage;
module.exports.getDomos = getDomos;
module.exports.getHungriestDomo = getHungriestDomo;
module.exports.make = makeDomo;
