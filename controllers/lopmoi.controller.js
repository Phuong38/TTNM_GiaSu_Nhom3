const LopMoi = require("../models/lopmoi.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const lopmoi = new LopMoi({
    tenPhuHuynh = req.body.tenPhuHuynh,
    sdt= req.body.sdt,
    diaChi= req.body.diaChi,
    diaChiEmail= req.body.diaChiEmail,
    lopHoc = req.body.lopHoc,
    monhoc= req.body.monhoc,
    buoi = req.body.buoi,
    ghiChu= req.body.ghiChu
    
  });

  // Save Customer in the database
  Customer.create(lopmoi, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};