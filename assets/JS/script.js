'use strict';

const baseUrl = 'http://localhost:3000/mood';

async function findAllMoods() {
  const response = await fetch(`${baseUrl}/all`);
  const moods = await response.json();

  moods.forEach((mood, index) => {
    const sectionMoods = document.getElementById('moods');

    if (index === 0 || mood.formattedDateBody !== moods[index - 1].formattedDateBody) {
      sectionMoods.insertAdjacentHTML(
        'afterbegin',
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
                <div class="icon deleteIcon updateDeleteIcon"><a href="/"></a></div>
            </div>

            <div class="moodText">
                ${mood.text}
            </div>

        </article>
      `,
    );
  });
}

findAllMoods();
