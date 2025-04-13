// game-logic.js
import { truths } from './game-data.js';

// Shared game functions
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('name') || '';
}

// Truth game function
export function initTruthGame() {
  const truthElement = document.getElementById('truth');
  const answerBtn = document.getElementById('answerBtn');
  
  // Display initial truth
  truthElement.textContent = getRandomItem(truths);
  
  // Set up answer button
  if (answerBtn) {
    answerBtn.addEventListener('click', () => {
      alert("Thanks for answering truthfully! 😊");
      // Get new truth question
      truthElement.textContent = getRandomItem(truths);
    });
  }
}