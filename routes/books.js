var express = require('express');
var router = express.Router();

var books = [{
  id: 1, name: "Tieng Viet 1"
}, {
  id: 2, name: "Tieng Viet 2"
}, {
  id: 3, name: "Tieng Viet 3"
}]

//localhost:3000/books
/* GET users listing. */
router.get('/', function (req, res, next) {
  let undeleted = books.filter(book => !book.isDeleted)
  res.status(200).send(undeleted);
});
//localhost:3000/books/
// Sử dụng hàm build in của array để viết dòng lệnh 
//tìm 1 quyển sách có id = req.params.id +0.5đ 
router.get('/:id', function (req, res, next) {
  var getbook = books.find(book => book.id == req.params.id)
  if (getbook) {
    res.status(200).send(getbook);
  } else {
    res.status(404).send("not found");
  }
});

router.post('/', function (req, res, next) {
  //var getbook = books.find(book => book.id == req.body.id)
  // if (getbook) {
  //   res.status(404).send("ID da ton tai");
  // } else {
    
  // }
  let newbook = {
    id: GenID(16),
    name: req.body.name
  }
  books.push(newbook);
  res.status(200).send(newbook);
});
router.put('/:id', function (req, res, next) {
  var getbook = books.find(book => book.id == req.params.id)
  if (getbook) {
    getbook.name = req.body.name;
    res.status(200).send(getbook);
  } else {
    res.status(404).send("ID khong ton tai");
  }
});
router.delete('/:id', function (req, res, next) {
  var getbook = books.find(book => book.id == req.params.id)
  if (getbook) {
    // var index = books.indexOf(getbook);
    // books.splice(index,1);
    getbook.isDeleted = true;
    res.status(200).send("xoa thanh cong");
  } else {
    res.status(404).send("ID khong ton tai");
  }
});
router.put('/restore/:id', function (req, res, next) {
  var getbook = books.find(book => book.id == req.params.id)
  if (getbook) {
    if (getbook.isDeleted) {
      getbook.isDeleted = undefined;
    }
    res.status(200).send("restore thanh cong");
  } else {
    res.status(404).send("ID khong ton tai");
  }
});

function GenID(num) {
  let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcde"+
  "fghiklmnopqrstuvwxyz0123456789"
  let result = "";
  for (let i = 0; i < num; i++) {
    let rand = Math.floor(Math.random()*61);
    result+=source[rand]
  }
  return result;
}

module.exports = router;
