const Record = require("../../models/record");
const Review = require("../../models/review");

module.exports = {
  index,
  create,
  show,
  update,
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

async function show(req, res) {
  await Record.findById(req.params.id)
    .populate("ratings")
    .exec(function (err, record) {
      Review.find({ _id: { $nin: record.ratings } }, function (err, ratings) {
        console.log(ratings);
        res.status(200).json();
      });
    });
}
// async function show(req, res) {
//   const record = await Record.findById(req.params.id);
//   record.ratings.populate("Review").exec(function (err) {
//     res.status(200).json();
//   });
// }

async function update(req, res) {
  const updatedRecord = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedRecord);
}

async function deleteOne(req, res) {
  const deletedRecord = await Record.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedRecord);
}
