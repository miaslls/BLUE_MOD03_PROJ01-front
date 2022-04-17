'use strict';

// 📌 DELETE - confirm deletion

async function confirmDeletion(createdat) {
  const response = await fetch(`http://localhost:3000/mood/${createdat}`);
  const mood = await response.json();

  pageTitle.innerHTML = `<h2>mood/<span>DESTROY</span></h2>`;

  contentA.innerHTML = showSingleMood(mood);

  containerB.innerHTML = `
  <section id="deleteMood">

    <h2>delete<strong>Mood</strong></h2>

    <p>are you sure you wanna do that? you can't reverse time after it...</p>

    <div id="deleteBtns">

        <span id="noBtn"><a onclick="window.location.reload()" target="_self"><span class="icon btnIcon" id="noIcon"></span>NOPE</a></span>

        <span id="yesBtn"><a onclick="deleteMood(${mood.createdat})"><span class="icon btnIcon" id="yesIcon"></span><strong>YEET</strong>&nbsp;it</a></span>

    </div>

  </section>
  `;
}

// 📌 DELETE - destroy

async function deleteMood(createdat) {
  const response = await fetch(`http://localhost:3000/mood/delete/${createdat}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json(); // 👁‍🗨

  window.location.reload();
}
