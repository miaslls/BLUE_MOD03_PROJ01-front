async function deleteMood(createdat) {
  const response = await fetch(`${baseUrlAPI}/delete/${createdat}`, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  });

  const result = await response.json(); // 👁‍🗨

  window.location.assign('https://miaslls.github.io/BLUE_MOD03_PROJ01-front/');
}
