const Record = require("../../models/record");

module.exports = {
  index,
  create,
  delete: deleteOne,
};

async function index(req, res) {
  const records = await Record.find({});
  res.status(200).json(records);
}

async function create(req, res) {
  const record = await Record.create(req.body);
  res.status(201).json(record);
}

async function deleteOne(req, res) {
  const deletedRecord = await Record.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedRecord);
}
