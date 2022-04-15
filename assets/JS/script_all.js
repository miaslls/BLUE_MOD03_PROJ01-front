'use strict';

const baseUrl = 'https://miamood-api.herokuapp.com/mood';

async function getAllMoods() {
  const response = await fetch(`${baseUrl}/all`);
  const moods = await response.json();

  moods.forEach((mood, index) => {
    const sectionMoods = document.getElementById('moods');

    if (index === 0 || mood.formattedDateBody !== moods[index - 1].formattedDateBody) {
      sectionMoods.insertAdjacentHTML(
        'beforeend',
        `<h3 class="titleDate"> ${mood.formattedDateTitle} </h3>`,
      );
    }

    sectionMoods.insertAdjacentHTML(
      'beforeend',
      `
        <article class="moodContainer mood_${mood.mood_id} ">

            <div class="icon moodIcon">
                ${mood.icon}
            </div>

            <div class="moodTimestamp">
                <span class="date"> ${mood.formattedDateBody} </span> @ <span class="time"> ${mood.formattedTime} </span>
            </div>

            <div class="moodOptions">
                <div class="icon updateIcon updateDeleteIcon"><a href="/"></a></div>
                <div class="icon deleteIcon updateDeleteIcon"><a onclick="deleteMood(${mood.createdat})"></a></div>
            </div>

            <div class="moodText">
                ${mood.text}
            </div>

        </article>
      `,
    );
  });
  const moodOptions = document.getElementsByClassName('moodOptions');
  const moodContainer = document.getElementsByClassName('moodContainer');

  for (let i = 0; i < moodContainer.length; i++) {
    moodContainer[i].addEventListener('mouseenter', () => {
      moodOptions[i].setAttribute('class', 'moodOptions visible');
    });
  }

  for (let i = 0; i < moodContainer.length; i++) {
    moodContainer[i].addEventListener('mouseleave', () => {
      moodOptions[i].setAttribute('class', 'moodOptions');
    });
  }
}

getAllMoods();
