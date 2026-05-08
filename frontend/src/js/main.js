document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('love-form');
  const loading = document.getElementById('loading');
  const result = document.getElementById('result');
  const checkBtn = document.getElementById('check-btn');
  const resetBtn = document.getElementById('reset-btn');
  const themeBtn = document.getElementById('theme-btn');
  const scoreText = document.getElementById('score-text');
  const scoreCircle = document.querySelector('.score-circle');
  const namesText = document.getElementById('names-text');
  const messageText = document.getElementById('message-text');

  // Theme Toggle
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
  }

  themeBtn.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      themeBtn.textContent = '🌙';
    } else {
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeBtn.textContent = '☀️';
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const boyName = document.getElementById('boy-name').value;
    const girlName = document.getElementById('girl-name').value;

    if (!boyName || !girlName) return;

    // Show loading
    form.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ boyName, girlName })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      // Fake delay for dramatic effect
      setTimeout(() => {
        showResult(data.score, data.message, boyName, girlName);
      }, 1500);

    } catch (error) {
      console.error('Error calculating love:', error);
      alert('Failed to calculate. Please try again.');
      loading.classList.add('hidden');
      form.classList.remove('hidden');
    }
  });

  resetBtn.addEventListener('click', () => {
    result.classList.add('hidden');
    form.classList.remove('hidden');
    form.reset();
  });

  function showResult(score, message, boy, girl) {
    loading.classList.add('hidden');
    result.classList.remove('hidden');
    
    namesText.textContent = `${boy} & ${girl}`;
    messageText.textContent = message;
    
    const hourglassFill = document.getElementById('hourglass-fill');
    const hourglassTopFill = document.getElementById('hourglass-top-fill');
    const hourglassStream = document.getElementById('hourglass-stream');
    const hourglassSvg = document.getElementById('result-hourglass');

    // Reset hourglass
    hourglassFill.setAttribute('height', 0);
    hourglassFill.setAttribute('y', 270);
    hourglassTopFill.setAttribute('height', 120);
    hourglassTopFill.setAttribute('y', 30);
    hourglassStream.setAttribute('height', 0);
    scoreText.textContent = `0%`;

    // Flip animation
    hourglassSvg.classList.add('flip-in');
    
    let currentScore = 0;
    
    setTimeout(() => {
      hourglassSvg.classList.remove('flip-in');
      
      const interval = setInterval(() => {
        if (currentScore >= score) {
          clearInterval(interval);
          currentScore = score;
          hourglassStream.setAttribute('height', 0); // Hide stream when done
        }
        scoreText.textContent = `${currentScore}%`;
        
        // Update bottom sand
        const bottomHeight = (currentScore / 100) * 120;
        hourglassFill.setAttribute('height', bottomHeight);
        hourglassFill.setAttribute('y', 270 - bottomHeight);
        
        // Dynamic stream height to touch the bottom sand
        if (currentScore < score) {
            hourglassStream.setAttribute('height', 120 - bottomHeight);
        }
        
        // Update top sand (empties out)
        const topHeight = 120 - bottomHeight;
        hourglassTopFill.setAttribute('height', topHeight);
        hourglassTopFill.setAttribute('y', 150 - topHeight); // Moves down as it empties
        
        if(currentScore < score) currentScore++;
      }, 30);
    }, 1000); // Start sand falling after flip
  }
});
