(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var config = {
  apiKey: "AIzaSyAYJ-AOjByRB6-Em-XS61ZTUPB1d82ECl8",
  authDomain: "panaderiaromo-f085b.firebaseapp.com",
  databaseURL: "https://panaderiaromo-f085b.firebaseio.com",
  projectId: "panaderiaromo-f085b",
  storageBucket: "panaderiaromo-f085b.appspot.com",
  messagingSenderId: "337438329949"
};
firebase.initializeApp(config);

var productsRef = firebase.database().ref().child('romo-test'),
    db = firebase.database(),
    productsList = document.getElementById('admin-products_list'),
    storage = firebase.storage(),
    bucket = storage.ref(),
    imgRef = bucket.child('images'),
    addProductForm = document.getElementById('addProduct');

var productTemplate = function productTemplate(_ref, id) {
  var code = _ref.code,
      name = _ref.name,
      description = _ref.description,
      urlImage = _ref.urlImage;

  return "\n    <p class=\"code\">" + code + "</p>\n    <p class=\"name\">" + name + "</p>\n    <p class=\"description\">" + description + "</p>\n    <img src=\"" + urlImage + "\" alt=\"" + name + "\" width=\"100%\">\n    <button class=\"delete\" data-id=\"" + id + "\">Borrar</button>\n  ";
};

var logOut = function logOut() {
  document.getElementById('logout').addEventListener('click', function (e) {
    firebase.auth().signOut().then(function () {
      location.href = 'login.html';
    }).catch(function (err) {
      console.log(err);
    });
  });
};

var dbPush = function dbPush(data, imageURL) {
  productsRef.push({
    code: data.get('code'),
    name: data.get('name'),
    description: data.get('description'),
    imgName: data.get('file').name,
    urlImage: imageURL
  }).then(function (msg) {
    console.log(msg);
    alert('Producto agrgado con éxito');
    document.body.removeChild(modal);
  }).catch(function (err) {
    return console.log(err);
  });
};

var uploadImage = function uploadImage(data, modal) {
  var file = data.get('file');
  var uploader = imgRef.child(file.name).put(file);
  uploader.on('state_changed', function (snapshop) {}, function (err) {
    console.log(err);
  }, function () {
    uploader.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      var imageURL = downloadURL;
      dbPush(data, imageURL, modal);
    });
  });
};

var deleteProduct = function deleteProduct(id) {};

var fireAction = function fireAction() {
  productsRef.on('child_added', function (data) {
    // console.log(data.val().urlImage)
    var li = document.createElement('li');
    li.id = data.key;
    li.setAttribute('data-image', data.val().imgName);
    li.innerHTML = productTemplate(data.val(), data.key);
    productsList.appendChild(li);
  });
  productsRef.on('child_changed', function (data) {});
  productsRef.on('child_removed', function (data) {
    var affectedNode = document.getElementById(data.key);
    productsList.removeChild(affectedNode);
  });
  addProductForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var productFils = new FormData(e.target);
    console.log(productFils.get('file'));
    uploadImage(productFils);
  });
};
var createModal = function createModal() {
  var modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';
  modal.innerHTML = "\n    <div class=\"modal__container\">\n      <div class=\"modal__close icon-close\" id=\"close\"></div>\n        <form class=\"addProduct\" id=\"addProduct\">\n          <div class=\"input-group modal__input-group\">\n            <label for=\"code\">C\xF3digo:</label>\n            <input name=\"code\" id=\"code\"required>\n          </div>\n          <div class=\"input-group modal__input-group\">\n            <label for=\"name\">Nombre del Producto:</label>\n            <input name=\"name\" id=\"name\" required>\n          </div>\n          <div class=\"input-group modal__input-group\">\n            <label for=\"description\">Descripci\xF3n del Producto:</label>\n            <textarea name=\"description\" id=\"description\" required></textarea>\n          </div>\n          <div class=\"input-group modal__input-group\">\n            <label for=\"file\">Foto del Producto:</label>\n            <input type=\"file\" name=\"file\" id=\"file\" required>\n          </div>\n          <footer class=\"modal-form-footer\">\n            <button class=\"modal-btn-add-product\">Agregar</button>\n          </footer>\n        </form>\n      </div>\n    </div>\n    \n  ";
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    var t = e.target;
    if (t.classList.contains('modal') || t.classList.contains('icon-close')) {
      document.body.removeChild(modal);
    }
  });
  modal.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var productFils = new FormData(e.target);
    console.log(productFils.get('file'));
    uploadImage(productFils, modal);
  });
};

document.addEventListener("DOMContentLoaded", function () {
  if (document.body.classList.contains('Login')) {
    var loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(e.target);
      firebase.auth().signInWithEmailAndPassword(formData.get('email'), formData.get('password')).then(function (user) {
        if (user) location.href = '../admin';
      }).catch(function (err) {
        console.log(err);
      });
    });
  } else if (document.body.classList.contains('Admin')) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        logOut();
        fireAction();
        document.addEventListener('click', function (e) {
          var affectedNode = e.target.parentElement;
          //UPDATE
          if (e.target.matches('button.edit')) {}

          //DELETE
          if (e.target.matches('button.delete')) {
            // console.log('Click', affectedNode)
            var id = affectedNode.id,
                image = affectedNode.dataset.image;
            bucket.child("images/" + image).delete().then(function () {
              return db.ref("romo-test/" + id).remove();
            }).catch(function (err) {
              return console.log(err);
            });
          }
          if (e.target.matches('button.btn.btn-add-product')) {
            createModal();
          }
        });
      } else {
        location.href = 'login.html';
      }
    });
  }
});

},{}]},{},[1]);

//# sourceMappingURL=scripts-admin-min.js.map
