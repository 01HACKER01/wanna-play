// Import Firebase using CDN URLs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQY93tarzia2pVn05wC4jqZOp35BKQ2Qs",
  authDomain: "mygamedata-16a84.firebaseapp.com",
  databaseURL: "https://mygamedata-16a84-default-rtdb.firebaseio.com",
  projectId: "mygamedata-16a84",
  storageBucket: "mygamedata-16a84.appspot.com",
  messagingSenderId: "306931455896",
  appId: "1:306931455896:web:f4f54e207b5ab45a7ebded"
};

// Initialize Firebase
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Tracking function with fallback
export async function trackGameEvent(eventData) {
  const eventPayload = {
    ...eventData,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    userAgent: navigator.userAgent
  };

  try {
    if (!db) {
      throw new Error("Firebase not initialized");
    }
    
    const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
    localStorage.setItem('userId', userId);
    
    await push(ref(db, `gameEvents/${userId}`), eventPayload);
    console.log("Event tracked:", eventData.type);
  } catch (error) {
    console.error("Tracking failed, saving locally:", error);
    // Fallback: Store events in localStorage if Firebase fails
    const failedEvents = JSON.parse(localStorage.getItem('failedEvents') || '[]');
    failedEvents.push(eventPayload);
    localStorage.setItem('failedEvents', JSON.stringify(failedEvents));
  }
}
