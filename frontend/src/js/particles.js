// Simple floating hearts particle system
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('particles-js');
  if (!container) return;

  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    createHeart();
  }

  function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'absolute';
    heart.style.fontSize = `${Math.random() * 20 + 10}px`;
    heart.style.opacity = Math.random() * 0.5 + 0.2;
    
    // Start position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + Math.random() * 100;
    
    // Animation duration and delay
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;

    heart.style.left = `${startX}px`;
    heart.style.top = `${startY}px`;
    heart.style.transition = `top ${duration}s linear, left ${duration}s linear`;
    
    container.appendChild(heart);

    setTimeout(() => {
      // End position
      const endY = -50;
      const endX = startX + (Math.random() * 100 - 50); // slight horizontal drift
      
      heart.style.top = `${endY}px`;
      heart.style.left = `${endX}px`;

      // Reset when done
      setTimeout(() => {
        heart.remove();
        createHeart();
      }, duration * 1000);
    }, delay * 1000);
  }
});
