(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function (d, c) {
  var toggle = d.getElementById('toggle-menu'),
      mainMenu = d.getElementById('main-menu');
  toggle.addEventListener('click', function () {
    mainMenu.classList.toggle('show');
  });
})(document, console.log);

var inputBlur = function inputBlur(inputs) {
  inputs.map(function (input) {
    input.addEventListener('blur', function (e) {
      verifyInputs(e.target);
    });
    input.addEventListener('focus', function (e) {
      e.target.parentElement.classList.add('full');
    });
    input.addEventListener('change', function (e) {
      verifyInputs(e.target);
    });
  });
};

var verifyInputs = function verifyInputs(input) {
  input.value !== '' ? input.parentElement.classList.add('full') : input.parentElement.classList.remove('full');
};

(function (d) {
  var inputs = _toConsumableArray(d.querySelectorAll('input, textarea'));

  inputBlur(inputs);
})(document);

var productsTemplate = function productsTemplate(_ref) {
  var code = _ref.code,
      name = _ref.name,
      description = _ref.description,
      urlImage = _ref.urlImage;
  return "\n    <img src=\"".concat(urlImage, "\" alt=\"").concat(name, "\">\n    <figcaption>").concat(name, "</figcaption>\n  ");
};

var showData = function showData(products, Section) {
  for (var item in products) {
    var figure = document.createElement('article');
    figure.className = 'products__item';
    figure.setAttribute('data-name', products[item].name);
    figure.setAttribute('data-description', products[item].description);
    figure.setAttribute('data-code', products[item].code);
    figure.setAttribute('data-img', products[item].urlImage);
    figure.innerHTML = "\n        <div class=\"products__img-container\">\n           <img src=\"".concat(products[item].urlImage, "\" alt=\"").concat(products[item].name, "\">\n        </div>\n        <p>").concat(products[item].name, "</p>\n    ");
    Section.appendChild(figure);
  }

  ;

  var poductsImgContainer = _toConsumableArray(document.querySelectorAll('.products__img-container'));

  poductsImgContainer.map(function (el) {
    var width = el.clientWidth;
    el.style.height = "".concat(width * .59, "px");
  });
};

var createModal = function createModal(data) {
  var modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';
  modal.innerHTML = "\n    <div class=\"modal__container\">\n      <div class=\"modal__close icon-close\" id=\"close\"></div>\n      <h2 class=\"modal__title\">".concat(data.name, "</h2>\n      <img src=\"").concat(data.img, "\" alt=\"\" class=\"modal-img\">\n      <p class=\"modal__description\">").concat(data.description, "</p>\n    </div>\n  ");
  document.body.appendChild(modal);
  modal.addEventListener('click', function (e) {
    var t = e.target;

    if (t.classList.contains('modal') || t.classList.contains('icon-close')) {
      document.body.removeChild(modal);
    }
  });
};

(function (d) {
  if (d.body.classList.contains('Productos')) {
    var Section = document.getElementById('products');
    fetch('https://panaderiaromo-f085b.firebaseio.com/romo-test.json').then(function (res) {
      return res.json();
    }).then(function (res) {
      showData(res, Section);
    });
    Section.addEventListener('click', function (e) {
      var t = e.target;

      if (t.nodeName === 'IMG') {
        if (t.parentElement.parentElement.classList.contains('products__item')) createModal(t.parentElement.parentElement.dataset);
      } else if (t.nodeName === 'P') {
        if (t.parentElement.classList.contains('products__item')) createModal(t.parentElement.dataset);
      }
    });
  }
})(document);

(function (d) {
  d.getElementById('year').textContent = " ".concat(new Date().getFullYear());
})(document);

(function (d) {
  var slider = d.getElementById('slaider');

  if (slider) {
    var sliderContainer = slider.querySelector('.slider-container'),
        left = slider.querySelector('#left'),
        right = slider.querySelector('#right');
    left.addEventListener('click', function (e) {
      sliderContainer.classList.remove('second');
    });
    right.addEventListener('click', function (e) {
      sliderContainer.classList.add('second');
    });
  }
})(document);

var showPhotosInstagram = function showPhotosInstagram(data, InstagramElement) {
  var d = document,
      c = console.log,
      instagramList = d.createElement('ul');
  instagramList.id = "instagram-list";
  instagramList.className = "owl-carousel";
  data.map(function (item) {
    // c(item)
    var li = d.createElement('li');
    li.innerHTML = "\n      <a href=\"".concat(item.link, "\" target=\"_blank\"><img src=\"").concat(item.images.low_resolution.url, "\" alt=\"").concat(item.caption.text, "\"></a>\n      \n    ");
    instagramList.appendChild(li);
  });
  InstagramElement.appendChild(instagramList);
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 3,
        nav: false
      },
      1000: {
        items: 5,
        nav: true
      }
    }
  });
}; // ((d,c)=>{
//   const InstagramElement = d.getElementById('instagram')
//   if (InstagramElement) {
//     const base = 'https://api.instagram.com/v1/users/self/media/recent/';
//     const userInstagram = {
//       clientId: '61e76587364b46fc844cdb02f34a6783',
//       token: '8414538295.61e7658.69cdb58d01234529b111ad43d299c30a',
//       user: 'panaderiaromo',
//       lastPhotos: 6
//     }
//     // const url = `https://api.instagram.com/v1/users/${userInstagram.user}/media/recent`
//     fetch(`${base}?access_token=${userInstagram.token}`)
//       .then(data => data.json())
//       .then(data => {
//         showPhotosInstagram(data.data, InstagramElement )
//         // let dataAll = data.data
//         // dataAll.map(item => {
//         //   c(item)
//         // })
//       })
//   }
//
// })(document, console.log);


var showFormSend = function showFormSend(form, data) {
  console.log(data);
  var msgEl = form.querySelector('#messagges-text'),
      btn = form.querySelector('button'),
      loader = form.querySelector('#loader'),
      sectionmsg = form.querySelector('.section-msg');
  console.log(form, data, msgEl, btn, loader);
  console.log(data.status);
  msgEl.innerHTML = data.msg;
  sectionmsg.classList.add('show');
  loader.classList.remove('show');

  if (data.status) {
    msgEl.classList.add('success');
    btn.textContent = "Enviado";
    btn.classList.add('disabled');
    btn.setAttribute('disabled', 'disabled');
    setTimeout(function () {
      sectionmsg.classList.remove('show');
      msgEl.textContent = "Mensaje Enviado";
      sectionmsg.querySelector('p').style.fontSize = '.8em !important';
    }, 4500);
  } else {
    msgEl.classList.add('error');
    setTimeout(function () {
      sectionmsg.classList.remove('show');
      msgEl.textContent = "Mensaje No Enviado";
      sectionmsg.querySelector('p').style.fontSize = '.8em !important';
    }, 4500);
  }
};

var contactFormSend = function contactFormSend(form, data, btn, loader) {
  var url = form.action;
  var myHeaders = new Headers();
  var myInit = {
    headers: myHeaders,
    mode: 'cors',
    body: data,
    cache: 'default'
  };
  var authOptions = {
    method: 'POST',
    url: form.action,
    data: data,
    headers: {
      'Authorization': 'Basic Y2xpZW50OnNlY3JldA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  };
  axios(authOptions).then(function (res) {
    // console.log(res)
    setTimeout(function () {
      showFormSend(form, res.data); // loader.classList.remove('show')
      // btn.textContent="Enviado"
      // btn.classList.add('disabled')
    }, 1500);
  })["catch"](function (err) {
    return console.log(err);
  });
};

var contactFormActions = function contactFormActions(form) {
  var c = console.log;
  var valid = true;
  var btnSubmit = form.querySelector('button');
  var loader = btnSubmit.querySelector('.loader');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    loader.classList.add('show');
    var data = new FormData(e.target);

    var _iterator = _createForOfIteratorHelper(data.values()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var value = _step.value;

        if (value === '' || value === null) {
          valid = false;
          alert('Todos los campos son requeridos');
          return;
        } else {
          valid = true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    valid ? contactFormSend(e.target, data, btnSubmit, loader) : alert('no valido');
  });
};

(function (d, w, c) {
  var contactForm = d.getElementById('contact-form');
  if (contactForm) contactFormActions(contactForm);
})(document, window, console.log);

},{}]},{},[1]);

//# sourceMappingURL=scripts-min.js.map
