import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCQY93tarzia2pVn05wC4jqZOp35BKQ2Qs",
  authDomain: "mygamedata-16a84.firebaseapp.com",
  databaseURL: "https://mygamedata-16a84-default-rtdb.firebaseio.com",
  projectId: "mygamedata-16a84",
  storageBucket: "mygamedata-16a84.appspot.com",
  messagingSenderId: "306931455896",
  appId: "1:306931455896:web:f4f54e207b5ab45a7ebded"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function trackGameEvent(eventData) {
  try {
    const userId = localStorage.getItem('userId') || `user_${Date.now()}`;
    localStorage.setItem('userId', userId);
    
    await push(ref(db, 'gameEvents'), {
      ...eventData,
      userId: userId,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      userAgent: navigator.userAgent
    });
    console.log('Tracked:', eventData.type);
  } catch (error) {
    console.error("Firebase error:", error);
  }
}