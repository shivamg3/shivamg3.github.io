const timeElement = document.querySelector('#local-time');
const dayWishElement = document.querySelector('#day-wish');
const intro = document.querySelector('.tap-intro');

function updateLocalTime() {
  const now = new Date();
  const hour = now.getHours();
  const time = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(now);
  const date = new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now);

  timeElement.dateTime = now.toISOString();
  timeElement.textContent = `${time} · ${date}`;

  if (hour >= 5 && hour < 12) dayWishElement.textContent = 'Hope you have a wonderful day ahead.';
  else if (hour >= 12 && hour < 17) dayWishElement.textContent = 'Hope the rest of your day goes beautifully.';
  else if (hour >= 17 && hour < 21) dayWishElement.textContent = 'Have a lovely evening.';
  else dayWishElement.textContent = 'Have a great night.';
}

function skipIntro() {
  document.body.classList.add('intro-skipped');
}

updateLocalTime();

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  skipIntro();
} else {
  intro.addEventListener('pointerdown', skipIntro, { once: true });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') skipIntro();
  }, { once: true });
  window.setTimeout(() => intro.remove(), 3300);
}
