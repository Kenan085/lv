// Floating hearts generator (unchanged)
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 3 + Math.random() * 2 + 's';
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);

// Reveal button and typing logic
const revealBtn = document.getElementById('reveal-btn');
const letter = document.getElementById('letter');
const message = document.querySelector('.message');
const bgMusic = document.getElementById('bg-music');

function startTyping() {
  const text = message.textContent || message.innerText;
  const chars = text.length;

  // Heuristics for duration: ~60ms per character, min 1500ms, max 12000ms
  const msPerChar = 60;
  const minDuration = 1500;
  const maxDuration = 12000;
  const duration = Math.min(maxDuration, Math.max(minDuration, chars * msPerChar));

  // Set width to full (100%) gradually by animating width with steps = chars
  // Use CSS animation string with exact steps to make cursor movement per character
  message.style.animation = `typing ${duration}ms steps(${chars}, end), blink 750ms step-end infinite`;

  // Apply an explicit width change using requestAnimationFrame to ensure transition
  // Ensure the message container has its computed width (so 100% is meaningful)
  // We'll animate width from 0 to 100% (the text is masked via overflow:hidden)
  message.style.width = '100%';

  // Listen for the typing animation to finish (animationend for 'typing')
  function onAnimationEnd(e) {
    if (e.animationName === 'typing') {
      // stop the blink and remove the caret visually
      message.style.animation = ''; // stop both typing & blink animations
      message.style.borderRight = 'none';
      message.removeEventListener('animationend', onAnimationEnd);
    }
  }
  message.addEventListener('animationend', onAnimationEnd);
}

revealBtn.addEventListener('click', () => {
  // single-click only (prevent replay)
  revealBtn.disabled = true;
  revealBtn.style.opacity = 0;
  setTimeout(() => revealBtn.style.display = 'none', 300);

  // show the letter and start typing after a tiny delay for fade effect
  letter.style.display = 'block';
  setTimeout(() => {
    letter.style.opacity = 1;
    startTyping();

    // Play music if available (some browsers require gesture -> click provides it)
    if (bgMusic) {
      bgMusic.play().catch(() => {});
    }
  }, 200);
});
