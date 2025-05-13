// Load saved animation speed from localStorage
const animationSpeedSelect = document.getElementById('animation-speed');
const savedSpeed = localStorage.getItem('animationSpeed') || 'medium';
animationSpeedSelect.value = savedSpeed;
applyAnimationSpeed(savedSpeed);

// Save animation speed to localStorage when changed
animationSpeedSelect.addEventListener('change', () => {
  const speed = animationSpeedSelect.value;
  localStorage.setItem('animationSpeed', speed);
  applyAnimationSpeed(speed);
});

// Apply animation speed to CSS
function applyAnimationSpeed(speed) {
  const durations = {
    slow: '2s',
    medium: '1s',
    fast: '0.5s'
  };

  const styleEl = document.getElementById("dynamic-style") || (() => {
    const el = document.createElement("style");
    el.id = "dynamic-style";
    document.head.appendChild(el);
    return el;
  })();

  styleEl.innerHTML = `
    @keyframes rotateAnimation {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .rotate {
      animation: rotateAnimation ${durations[speed]} linear;
    }
  `;
}

// Trigger rotation animation on image click
const images = document.querySelectorAll('.store-card img');
const durationMap = {
  slow: 2000,
  medium: 1000,
  fast: 500
};

images.forEach(img => {
  img.addEventListener('click', () => {
    img.classList.add('rotate');
    setTimeout(() => {
      img.classList.remove('rotate');
    }, durationMap[animationSpeedSelect.value]);
  });
});