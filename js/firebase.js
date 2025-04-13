import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, push, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQY93tarzia2pVn05wC4jqZOp35BKQ2Qs",
  authDomain: "mygamedata-16a84.firebaseapp.com",
  projectId: "mygamedata-16a84",
  storageBucket: "mygamedata-16a84.firebasestorage.app",
  messagingSenderId: "306931455896",
  appId: "1:306931455896:web:f4f54e207b5ab45a7ebded",
  measurementId: "G-R2CQ70G7JD"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Enhanced logging with error handling
export async function logEvent(eventType, data = {}) {
  const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
  localStorage.setItem('userId', userId);
  
  const eventData = {
    ...data,
    timestamp: new Date().toString(),
    page: window.location.pathname
  };

  try {
    await push(ref(database, `events/${userId}`), eventData);
  } catch (error) {
    console.error("Firebase logging error:", error);
  }
}

// Initialize game tracking
export function initGameTracking() {
  const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
  localStorage.setItem('userId', userId);
  
  logEvent('page_visit');
  
  // Track button clicks
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
      logEvent('button_click', {
        buttonText: e.target.textContent,
        buttonId: e.target.id || 'none'
      });
    }
  });

  // Track page exit
  window.addEventListener('beforeunload', () => {
    logEvent('page_exit');
  });
}