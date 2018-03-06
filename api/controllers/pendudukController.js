'use strict';


var mongoose = require('mongoose'),
  Penduduk = mongoose.model('tbl_penduduks');

exports.list_all_penduduk = function(req, res) {
    Penduduk.find({}, function(err, penduduk) {
    if (err)
      res.send(err);
    res.json(penduduk);
  });
};

exports.create_penduduk = function(req, res) {
  var new_penduduk = new Penduduk(req.body);
  new_penduduk.save(function(err, penduduk) {
    if (err)
      res.send(err);
    res.json(penduduk);
  });
};


exports.read_penduduk = function(req, res) {
    Penduduk.findById(req.params.NIP, function(err, penduduk) {
    if (err)
      res.send(err);
    res.json(penduduk);
  });
};


exports.update_penduduk = function(req, res) {
    Penduduk.findOneAndUpdate({NIP: req.params.NIP}, req.body, {new: true}, function(err, penduduk) {
    if (err)
      res.send(err);
    res.json(penduduk);
  });
};


exports.delete_penduduk = function(req, res) {
  Penduduk.remove({
    NIP: req.params.NIP
  }, function(err, penduduk) {
    if (err)
      res.send(err);
    res.json({ message: 'Penduduk successfully deleted' });
  });
};