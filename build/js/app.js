(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "c2d7269116a1f356e5f16b448c219c73";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

// constructor to store doctors names in an array
function Doctor(list) {
  this.list = [];
}

// create method to reassign this.list array to feature names of the doctors
Doctor.prototype.names = function(apiResults) {
  this.list = apiResults;
};

exports.getDoctors = function(medicalIssue) {

  var allDocNames = [];

  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {

      result.data.forEach(function(resultArray){
        var docName = resultArray.practices.name;
        allDocNames.push(docName);
      });

      var doctors = new Doctor();
      Doctor.names(allDocNames)
      finalList = doctors.list
      $('doctorList').text(finalList)
    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
var Doctor = require('./../js/doctor.js').doctorModule;
var apiKey = require('./../.env').apiKey;


$(document).ready(function() {

  $('#issueForm').submit(function(event){
    event.preventDefault();
    var medicalIssue = $("#issue").val();
    exports.getDoctors(medicalIssue);
  });
});

},{"./../.env":1,"./../js/doctor.js":2}]},{},[3]);
