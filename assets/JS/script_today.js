'use strict';

async function getTodayMoods() {
  const response = await fetch(`http://localhost:3000/mood/today`);
  const moods = await response.json();

  const sectionMoods = document.getElementById('moods');

  if (moods.length !== 0) {
    moods.forEach((mood, index) => {
      if (index === 0) {
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
                <div class="icon deleteIcon updateDeleteIcon"><a onclick="confirmDeletion(${mood.createdat})"></a></div>
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
    // 📌
  } else {
    sectionMoods.insertAdjacentHTML(
      'beforeend',
      `
  <h2>no<strong>MOOD</strong></h2>

  <p>looks like you've been a lazy little piece of shit and didn't log any moods today, huh?</p>

  <div id="noMoodBtns">

    <span id="addBtn"><a href="/new.html" target="_self">new<strong>MOOD</strong><span class="icon btnIcon" id="addIcon"></span></a></span>

  </div>
  `,
    );
  }
}

getTodayMoods();
