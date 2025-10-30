// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD...तुझा_key...",
  authDomain: "mini-chatt-app.firebaseapp.com",
  databaseURL: "https://mini-chatt-app-default-rtdb.firebaseio.com/",
  projectId: "mini-chatt-app",
  storageBucket: "mini-chatt-app.appspot.com",
  messagingSenderId: "797318922107",
  appId: "1:797318922107:web:45fbd2693b17d7xxxxx",
  measurementId: "G-REX6613507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const msgRef = ref(db, "messages");

// Get elements
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");
const messagesDiv = document.getElementById("messages");

// Send message to Firebase
sendButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(msgRef, {
      username: username,
      text: message,
      timestamp: Date.now()
    });
    messageInput.value = "";
  }
});

// Listen for new messages (Real-time update)
onValue(msgRef, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const msg = childSnapshot.val();
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${msg.username}:</strong> ${msg.text}`;
    messagesDiv.appendChild(msgElement);
  });
});