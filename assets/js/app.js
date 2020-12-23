//MOBILE MENU
const mainMenu = document.getElementById('main-menu');
const mobileMenu = document.getElementById('mobile-menu');
mainMenu.addEventListener('click', function () {
  mobileMenu.classList.remove('hidden', 'opacity-0', 'scale-95');
  mobileMenu.classList.add('opacity-100', 'scale-100');
});

const exitMobileMenu = document.getElementById('exit-mobile-menu');
exitMobileMenu.addEventListener('click', function () {
  mobileMenu.classList.add('hidden', 'opacity-0', 'scale-95');
  mobileMenu.classList.remove('opacity-100', 'scale-100');
});

//CONFIRMATION MODAL
const modalBg = document.getElementById('modal_bg');
const modalContent = document.getElementById('modal_content');
const goBackBtn = document.getElementById('goback_btn');
const contactBtn = document.getElementById('contact_btn');

function modalBgEnter() {
  modalBg.classList.remove('opacity-0', 'hidden');
  modalBg.classList.add('opacity-100', 'ease-out', 'duration-300');
}
function modalContentEnter() {
  modalContent.classList.remove(
    'opacity-0',
    'hidden',
    'translate-y-4',
    'sm:translate-y-0',
    'sm:scale-95'
  );
  modalContent.classList.add(
    'ease-out',
    'duration-300',
    'opacity-100',
    'translate-y-0',
    'sm:scale-100'
  );
}

function modalBgLeave() {
  modalBg.classList.remove('opacity-100', 'ease-out', 'duration-300');
  modalBg.classList.add('opacity-0', 'duration-200', 'ease-out', 'hidden');
}
function modalContentLeave() {
  modalContent.classList.remove('opacity-100', 'ease-out', 'duration-300');
  modalContent.classList.add(
    'opacity-0',
    'duration-200',
    'hidden',
    'translate-y-4',
    'sm:translate-y-0',
    'sm:scale-95'
  );
  window.location.hash = '#home';
}

goBackBtn.addEventListener('click', modalBgLeave);
goBackBtn.addEventListener('click', modalContentLeave);

//MAIL CONTACT FORM
window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact_form');
  let status = document.getElementById('form_status');

  function success() {
    form.reset();

    modalBgEnter();
    modalContentEnter();
  }

  function error() {
    status.innerHTML =
      ' <div class="rounded-md bg-red-50 p-4">\n' +
      '  <div class="flex">\n' +
      '    <div class="flex-shrink-0">\n' +
      '      <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">\n' +
      '        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />\n' +
      '      </svg>\n' +
      '    </div>\n' +
      '    <div class="ml-3">\n' +
      '      <h3 class="text-sm leading-5 font-medium text-red-800">\n' +
      '        There was an error with your submission\n' +
      '      </h3>\n' +
      '      <div class="mt-2 text-sm leading-5 text-red-700">\n' +
      '        <p>\n' +
      '            Please try again\n' +
      '        </p>\n' +
      '      </div>\n' +
      '    </div>\n' +
      '  </div>\n' +
      '</div>';
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    let data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

function ajax(method, url, data, success, error) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader('Accept', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}

//ANIMATION LIBRARY LOAD
AOS.init({
  delay: 200,
  duration: 1600,
  once: false,
});

//TYPEWRITER
const TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  const i = this.loopNum % this.toRotate.length;
  const fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  const that = this;
  const delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  const elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};
