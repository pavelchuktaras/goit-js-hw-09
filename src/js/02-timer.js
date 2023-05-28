import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.getElementById('datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  labels: document.querySelectorAll('.label'),
  timer: document.querySelectorAll('.timer'),
};
let chosenDate = 0;
let currentDate = new Date().getTime();
let intervalId;

refs.timer.forEach(element => {
  element.classList.add('timer-class');
});

refs.input.classList.add('input-class');
refs.startBtn.classList.add('button');

refs.startBtn.addEventListener('click', startCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];

    if (chosenDate < currentDate) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else if (chosenDate > currentDate) {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () => {
        startCountdown();
      });
    }
  },
};

refs.startBtn.disabled = true;
flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  if (refs.input.value === '' || refs.startBtn.disabled) {
    noTime();
  } else {
    refs.days.textContent = addLeadingZero(`${days}`);
    refs.hours.textContent = addLeadingZero(`${hours}`);
    refs.minutes.textContent = addLeadingZero(`${minutes}`);
    refs.seconds.textContent = addLeadingZero(`${seconds}`);
  }
  return { days, hours, minutes, seconds };
}

function noTime() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
  return;
}

function startCountdown() {
  if (chosenDate > currentDate) {
    intervalId = setInterval(() => {
      currentDate = new Date().getTime();
      const ms = Math.floor(chosenDate - currentDate);
      convertMs(ms);
      if (ms <= 0) {
        // clearInterval(intervalId);
        noTime();
      }
    }, 1000);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
