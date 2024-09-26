const renderTips = async () => {
  try {
    const response = await fetch('http://localhost:3001/tips');

    // Check if the response is okay
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const mainContent = document.getElementById('main-content');

    // Check if data is an array and has elements
    if (Array.isArray(data) && data.length > 0) {
      data.map((tip) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const topContainer = document.createElement('div');
        topContainer.classList.add('top-container');
        topContainer.style.backgroundImage = `url(${tip.image})`;

        const bottomContainer = document.createElement('div');
        bottomContainer.classList.add('bottom-container');

        // Title
        const title = document.createElement('h3');
        title.textContent = tip.title; // Corrected from `name` to `title`
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
        link.href = `/tips/${tip.id}`; // Correctly using tip.id
        bottomContainer.appendChild(link);

        // Append containers to card
        card.appendChild(topContainer);
        card.appendChild(bottomContainer);

        // Append card to main content
        mainContent.appendChild(card);
      });
    } else {
      // If no tips are available
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

// Call the render function to display the tips
renderTips();
