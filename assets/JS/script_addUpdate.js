'use sctrict';

function openNewMoodForm() {
  moodFormHTML();
  formScript();
}

async function openUpdateMoodForm(createdat) {
  const response = await fetch(`http://localhost:3000/mood/${createdat}`);
  const mood = await response.json();

  moodFormHTML(mood);
  formScript(mood);
}

function getMoodFromForm() {
  const mood_id = Number(document.getElementById('mood_idInput').value);
  const icon = document.getElementById('iconInput').value;
  const text = document.getElementById('textInput').value;

  const date = document.getElementById('dateInput').value;
  const time = document.getElementById('timeInput').value;

  const dateTime = `${date}T${time}`;

  const createdat = document.getElementById('createdatInput').value;

  return {
    mood_id,
    icon,
    text,
    dateTime,
    createdat,
  };
}

async function addMood() {
  const mood = getMoodFromForm();

  const response = await fetch('http://localhost:3000/mood/add', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(mood),
  });

  const newMood = await response.json(); // 👁‍🗨 response.ok

  window.location.assign('/');
}

async function updateMood(createdat) {
  const mood = getMoodFromForm();

  const response = await fetch(`http://localhost:3000/mood/update/${createdat}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(mood),
  });

  const updated = await response.json(); // 👁‍🗨 response.ok

  window.location.assign('/');
}
