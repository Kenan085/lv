// Floating hearts generator
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

// Reveal button logic
const revealBtn = document.getElementById('reveal-btn');
const letter = document.getElementById('letter');
const message = document.querySelector('.message');
const bgMusic = document.getElementById('bg-music');

revealBtn.addEventListener('click', () => {
  revealBtn.style.display = 'none'; // hide button
  letter.style.display = 'block';   // show letter
  setTimeout(() => {
    letter.style.opacity = 1;
    message.style.animation = 'typing 6s steps(40, end), blink 0.75s step-end infinite';
  }, 200);

  // Play music if available
  bgMusic.play().catch(() => {});
});
