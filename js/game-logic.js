import { truths, dares } from './game-data.js';

// Shared game functions
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('name') || '';
}

export function handleModal(modalId, action = 'open') {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = action === 'open' ? 'flex' : 'none';
  }
}

// Game-specific functions
export function initTruthGame() {
  document.getElementById('truth').textContent = getRandomItem(truths);
  document.getElementById('newTruthBtn').addEventListener('click', () => {
    document.getElementById('truth').textContent = getRandomItem(truths);
  });
}

export function initDareGame() {
  const dareText = document.getElementById('dareText');
  dareText.textContent = getRandomItem(dares);
  
  document.getElementById('newDareBtn').addEventListener('click', () => {
    dareText.textContent = getRandomItem(dares);
  });
}

export function initWelcomePage() {
  const name = getNameFromURL();
  if (name) {
    document.getElementById("welcomeHeading").textContent = `Choose Truth or Dare, ${name}!`;
  }
}