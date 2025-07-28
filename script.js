// Enable video audio after first user gesture (for mobile browser policies)
window.addEventListener('touchend', enableVideoAudio, { once: true });
window.addEventListener('click', enableVideoAudio, { once: true });

function enableVideoAudio() {
  const vid = document.getElementById('mainvid');
  if (vid) {
    vid.muted = false;
    vid.play && vid.play();
  }
}

// Reveal message per character, typewriter + audio
const characterButtons = document.querySelectorAll('.character');
characterButtons.forEach(Element => Element.addEventListener('click', showMessage));

function showMessage(event) {
    const index = event.target.getAttribute('data-index');
    const message = document.querySelector(`.m${index}`);
    const audio = document.getElementById(`audio${index}`);

    // If already open, collapse it
    if (!message.classList.contains('collapsed')) {
      message.classList.add('collapsed');
      event.target.classList.remove('playing');
      audio && audio.pause();
      audio && (audio.currentTime = 0);
      return;
    }

    // Collapse all first
    document.querySelectorAll('.message').forEach(m => m.classList.add('collapsed'));
    document.querySelectorAll('.character').forEach(img => img.classList.remove('playing'));
    // Reveal and play with typewriter
    const messageCopy = message.textContent;
    message.classList.remove('collapsed');
    message.textContent = '';
    event.target.classList.add('playing');
    audio && (audio.currentTime = 0);
    audio && audio.play();
    let currentIndex = 0;
    function typeOutText() {
        if (currentIndex < messageCopy.length) {
            message.textContent += messageCopy[currentIndex];
            currentIndex++;
            setTimeout(typeOutText, 18);
        }
    }
    typeOutText();
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
}
