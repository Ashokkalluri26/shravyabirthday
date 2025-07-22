// Candle blow-out logic
function blowOutCandles() {
  // Extinguish flames
  document.querySelectorAll('.flame').forEach(f => f.classList.add('extinguished'));
  // Hide blow text
  document.getElementById('blow-text').classList.add('hidden');
  // After a short delay, show the birthday message and animate gallery
  setTimeout(() => {
    document.querySelector('.cake-section').classList.add('hidden');
    const msg = document.getElementById('birthday-message');
    msg.classList.add('show');
    msg.classList.remove('hidden');
    const gallery = document.querySelector('.animated-gallery');
    gallery.classList.remove('hidden');
    gallery.classList.add('show');
    animateGallery();
    launchDecorations();
  }, 1200);
}

// Animate gallery images in sequence
function animateGallery() {
  const imgs = document.querySelectorAll('.animated-gallery img');
  imgs.forEach((img, i) => {
    setTimeout(() => {
      img.classList.add('animated');
      // Remove and re-add to restart animation if needed
      img.style.animationDelay = (i * 0.25) + 's';
    }, 250 * i);
  });
}

// Confetti and balloons
function createConfetti() {
  const colors = ['#ff4e50', '#f9d423', '#6ec6ff', '#ffb347', '#81c784', '#ff6f91'];
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
  confetti.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
  document.getElementById('decorations').appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  // Random horizontal position
  balloon.style.left = Math.random() * 92 + 'vw';
  // Assign a random bright gradient
  const gradients = [
    'linear-gradient(135deg, #ff4e50 60%, #f9d423 100%)',
    'linear-gradient(135deg, #6ec6ff 60%, #81c784 100%)',
    'linear-gradient(135deg, #ffb347 60%, #ff4e50 100%)',
    'linear-gradient(135deg, #f9d423 60%, #6ec6ff 100%)',
    'linear-gradient(135deg, #ff6f91 60%, #ffd166 100%)',
    'linear-gradient(135deg, #81c784 60%, #ffd166 100%)',
    'linear-gradient(135deg, #f48fb1 60%, #ce93d8 100%)',
  ];
  balloon.style.setProperty('--balloon-color', gradients[Math.floor(Math.random() * gradients.length)]);
  // Randomize animation duration for natural effect
  balloon.style.animationDuration = (7 + Math.random() * 4) + 's';
  document.getElementById('decorations').appendChild(balloon);
  setTimeout(() => balloon.remove(), 12000);
}

function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = Math.random() * 100 + 'vw';
  sparkle.style.top = Math.random() * 90 + 'vh';
  sparkle.innerHTML = `<svg viewBox="0 0 20 20"><polygon points="10,2 12,8 18,10 12,12 10,18 8,12 2,10 8,8" fill="#fffbe7" stroke="#ffd700" stroke-width="1.2"/></svg>`;
  document.getElementById('decorations').appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1300);
}

// Balloons always visible in the background
function startBalloonLoop() {
  function spawnBalloon() {
    createBalloon();
    setTimeout(spawnBalloon, 350 + Math.random() * 400);
  }
  // Start with more balloons
  for (let i = 0; i < 18; i++) {
    setTimeout(createBalloon, i * 220);
  }
  spawnBalloon();
}

// Remove balloons from launchDecorations
function launchDecorations() {
  // Confetti
  for (let i = 0; i < 40; i++) {
    setTimeout(() => createConfetti(), Math.random() * 1200);
  }
  // Sparkles
  for (let i = 0; i < 18; i++) {
    setTimeout(() => createSparkle(), 400 + Math.random() * 1800);
  }
}

// Password protection logic
const PASSWORD = '2307'; // Set your date+month password here (DDMM)
window.addEventListener('DOMContentLoaded', () => {
  // Password overlay logic
  const overlay = document.getElementById('password-overlay');
  const input = document.getElementById('password-input');
  const submit = document.getElementById('password-submit');
  const error = document.getElementById('password-error');
  function checkPassword() {
    if (input.value === PASSWORD) {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      // Show cake section
      document.querySelector('.cake-section').classList.remove('hidden');
      // Attach cake click and auto-blow only after cake is shown
      const cake = document.getElementById('cake-svg');
      cake.addEventListener('click', blowOutCandles, { once: true });
      setTimeout(() => {
        if (!document.querySelector('.flame.extinguished')) {
          blowOutCandles();
        }
      }, 3500);
    } else {
      error.textContent = 'Incorrect! Please try again.';
      input.value = '';
      input.focus();
    }
  }
  submit.addEventListener('click', checkPassword);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPassword();
  });
  input.focus();
  document.body.style.overflow = 'hidden';

  // Balloons always floating
  startBalloonLoop();

  // Cake logic
}); 