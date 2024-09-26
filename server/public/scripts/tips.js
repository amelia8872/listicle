const renderTips = async () => {
  const response = await fetch('/tips');
  const data = await response.json();

  const mainContent = document.getElementById('main-content');

  if (data) {
    data.map((tip) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const topContainer = document.createElement('div');
      topContainer.classList.add('top-container');
      topContainer.style.backgroundImage = `url(${tip.image})`;

      const bottomContainer = document.createElement('div');
      bottomContainer.classList.add('bottom-container');

      const title = document.createElement('h3');
      title.textContent = tip.title;
      bottomContainer.appendChild(title);

      const category = document.createElement('h5');
      category.textContent = 'Category: ' + tip.category;
      bottomContainer.appendChild(category);

      const text = document.createElement('p');
      text.textContent = tip.text;
      bottomContainer.appendChild(text);

      const link = document.createElement('a');
      link.textContent = 'Read More >';
      link.setAttribute('role', 'button');
      link.href = `/tips/${tip.id}`;
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const requestedID = tip.id; // Get the ID of the clicked tip
        history.pushState(null, '', `/tips/${requestedID}`); // Change URL
        renderTip(requestedID); // Pass the ID to renderTip
      });
      bottomContainer.appendChild(link);

      card.appendChild(topContainer);
      card.appendChild(bottomContainer);
      mainContent.appendChild(card);
    });
  } else {
    console.error('Error fetching tips:', error);
    const mainContent = document.getElementById('main-content');
    const message = document.createElement('h2');
    message.textContent = 'Error fetching tips. Please try again later.';
    mainContent.appendChild(message);
  }
};

const renderTip = async () => {
  const requestedID = parseInt(window.location.href.split('/').pop());
  const response = await fetch('/tips');
  const data = await response.json();

  const tipContent = document.getElementById('tip-content');
  let tip;
  tip = data.find((tip) => tip.id === requestedID);

  if (tip) {
    document.getElementById('image').src = tip.image;
    document.getElementById('title').textContent = tip.title;
    document.getElementById('submittedBy').textContent =
      'Submitted by: ' + tip.submittedBy;
    document.getElementById('category').textContent =
      'Category: ' + tip.category;
    document.getElementById('text').textContent = tip.text;
  } else {
    const message = document.createElement('h2');
    message.textContent = 'No Tip Available 😞';
    tipContent.appendChild(message);
  }
};

const requestedUrl = window.location.href.split('/').pop();

if (requestedUrl) {
  window.location.href = '../404.html';
} else {
  renderTips();
}

renderTip();
