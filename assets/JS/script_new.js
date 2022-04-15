'use strict';

const baseUrl = 'https://miamood-api.herokuapp.com/mood';

const iconList = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
];

const iconWrapper = document.getElementById('iconWrapper');

for (let icon of iconList) {
  iconWrapper.insertAdjacentHTML(
    'beforeend',
    `
    <div class="icon moodIcon custom">${icon}</div>
    `,
  );
}

// 📌📌📌🚨

const mood_idInput = document.getElementById('mood_idInput');
const iconInput = document.getElementById('iconInput');

const button = document.getElementById('addMoodBtn');
const btnIcon = document.getElementById('btnIcon');

// 📌

const defaultIconList = document.getElementsByClassName('moodIcon default');

for (let moodIcon of defaultIconList) {
  moodIcon.addEventListener('click', () => {
    mood_idInput.value = moodIcon.id;
    iconInput.value = moodIcon.innerText;

    button.disabled = false;
    button.setAttribute('class', `mood_${moodIcon.id} btnEnabled`);
    btnIcon.innerText = moodIcon.innerText;
  });
}

// 📌

const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');

const today = new Date();

const year = today.getFullYear().toString().padStart(4, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');

const date = `${year}-${month}-${day}`;

const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const seconds = today.getSeconds().toString().padStart(2, '0');

const time = `${hours}:${minutes}:${seconds}`;

dateInput.value = date;
timeInput.value = time;

const createdat = `${year}${month}${day}${hours}${minutes}${seconds}`;

// 📌

dateInput.addEventListener('input', (e) => {
  timeInput.value = '00:00:00';
});

// 📌

const customIconList = document.getElementsByClassName('moodIcon custom');

for (let customIcon of customIconList) {
  customIcon.addEventListener('click', () => {
    iconInput.value = customIcon.innerText;
    btnIcon.innerText = customIcon.innerText;
  });
}

// 📌📌📌🚨

async function addMood() {
  const mood_id = Number(document.getElementById('mood_idInput').value);
  const icon = document.getElementById('iconInput').value;
  const text = document.getElementById('textInput').value;

  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;

  const dateTime = `${date}T${time}`;

  const year = date.substr(0, 4);
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const hours = time.substr(0, 2);
  const minutes = time.substr(3, 2);
  const seconds = time.substr(3, 2);

  const createdat = year + month + day + hours + minutes + seconds;

  const mood = {
    mood_id,
    icon,
    text,
    dateTime,
    createdat,
  };
  const response = await fetch(baseUrl + '/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(mood),
  });

  const newMood = await response.json();

  window.location.replace('/');
}
