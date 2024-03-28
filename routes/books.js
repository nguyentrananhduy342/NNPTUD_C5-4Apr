var express = require('express');
var router = express.Router();
var bookModel = require('../schemas/book')
var authorModel = require('../schemas/author')
router.get('/', async function (req, res, next) {
  let limit = req.query.limit ? req.query.limit : 5;
  let page = req.query.page ? req.query.page : 1;
  var queries = {};
  var exclude = ["sort","page","limit"];
  var stringFilter = ["name","author"];
  var numberFilter = ["year"];
  //{ page: '1', limit: '5', name: 'Hac,Ly', author: 'Cao' }
  for (const [key,value] of Object.entries(req.query)) {
      if(!exclude.includes(key)){
        if(stringFilter.includes(key)){
          queries[key] = new RegExp(value.replace(',','|'),'i');
        }else{
          
        }
      }
  }
  queries.isDeleted=false;
  books = await bookModel.find(queries)
  .populate({path:'author',select:"_id name"}).lean()
    .skip((page - 1) * limit).limit(limit).exec();
  res.status(200).send(books);
});
router.get('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.findById(req.params.id).exec();
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newBook = new bookModel({
      name: req.body.name,
      year: req.body.year,
      author: req.body.author
    });
    await newBook.save();
    res.status(200).send(newBook);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.findByIdAndUpdate(req.params.id, req.body,
      {
        new: true
      }).exec();
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send(error);
  }
});
router.delete('/:id', async function (req, res, next) {
  try {
    var book = await bookModel.findByIdAndUpdate(req.params.id, {
      isDeleted: true
    },
      {
        new: true
      }).exec();
    res.status(200).send(book);
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
