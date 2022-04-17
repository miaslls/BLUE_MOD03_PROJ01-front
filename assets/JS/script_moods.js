'use strict';

// timerange: all OR today

window.addEventListener('load', getTodayMoods());

function getTodayMoods() {
  getMoods('today');
}

function getAllMoods() {
  getMoods('all');
}

async function getMoods(timerange) {
  const response = await fetch(`http://localhost:3000/mood/${timerange}`);
  const moods = await response.json();

  pageTitle.innerHTML = `<h2>mood/<span>${timerange.toUpperCase()}</span></h2>`;

  contentA.innerHTML = '<section id="moods"></section>';

  if (moods.length !== 0) {
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
  } else {
    document.getElementById('moods').insertAdjacentHTML(
      'beforeend',
      `
    <h2>no<strong>MOOD</strong></h2>
  
    <p>looks like you've been a lazy little piece of shit and didn't log any moods, huh?</p>
  
    <div id="noMoodBtns">
  
      <span id="addBtn"><a href="/new.html" target="_self">new<strong>MOOD</strong><span class="icon btnIcon" id="addIcon"></span></a></span>
  
    </div>
    `,
    );
  }
}
