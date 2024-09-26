let tipsData = []; // Store fetched tips here

const renderTips = async () => {
  try {
    const response = await fetch('http://localhost:3001/tips');
    if (!response.ok) throw new Error('Network response was not ok');

    tipsData = await response.json(); // Store the fetched data
    const mainContent = document.getElementById('main-content');

    if (Array.isArray(tipsData) && tipsData.length > 0) {
      tipsData.forEach((tip) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const topContainer = document.createElement('div');
        topContainer.classList.add('top-container');
        topContainer.style.backgroundImage = `url(${tip.image})`;

        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('bottom-container');

        // Title
        const title = document.createElement('h3');
        title.textContent = tip.title;
        bottomContainer.appendChild(title);

        // Category
        const category = document.createElement('h5');
        category.textContent = 'Category: ' + tip.category;
        bottomContainer.appendChild(category);

        // Description Text
        const text = document.createElement('p');
        text.textContent = tip.text;
        bottomContainer.appendChild(text);

        // Read More Link
        const link = document.createElement('a');
        link.textContent = 'Read More >';
        link.setAttribute('role', 'button');
        link.href = `/tips/${tip.id}`;
        bottomContainer.appendChild(link);

        // Append containers to card
        card.appendChild(topContainer);
        card.appendChild(bottomContainer);

        // Append card to main content
        mainContent.appendChild(card);
      });
    } else {
      const message = document.createElement('h2');
      message.textContent = 'No Tips Available 😞';
      mainContent.appendChild(message);
    }
  } catch (error) {
    console.error('Error fetching tips:', error);
    const mainContent = document.getElementById('main-content');
    const message = document.createElement('h2');
    message.textContent = 'Error fetching tips. Please try again later.';
    mainContent.appendChild(message);
  }
};

const renderTip = () => {
  console.log('Executing renderTip...');
  const tipsDataContent = document.getElementById('tip-content');

  if (!tipsDataContent) {
    console.error('tipsDataContent is null, skipping rendering.');
    return; // Stop execution if the element is not found
  }

  const requestedID = parseInt(window.location.href.split('/').pop());
  console.log('Requested ID:', requestedID);
  console.log('Current tipsData:', tipsData);

  const tip = tipsData.find((tip) => tip.id === requestedID);
  console.log('Tip found:', tip);

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
    message.textContent = 'No Tips Available 😞';
    tipsDataContent.appendChild(message);
  }
};

// Ensure the DOM is fully loaded before calling render functions
document.addEventListener('DOMContentLoaded', () => {
  renderTips();
  if (window.location.pathname.includes('/tips/')) {
    renderTip();
  }
});
