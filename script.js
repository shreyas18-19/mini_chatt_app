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
// Typing indicator setup
const typingRef = ref(db, "typing");

messageInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  if (!username) return;

  set(typingRef, {
    name: username,
    isTyping: messageInput.value.length > 0
  });
});

onValue(typingRef, (snapshot) => {
  const typingData = snapshot.val();
  const typingDiv = document.getElementById("typing-indicator");

  if (typingData && typingData.isTyping && typingData.name !== usernameInput.value) {
    typingDiv.style.opacity = 1;
  } else {
    typingDiv.style.opacity = 0;
  }
});
sendButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (username && message) {
    push(msgRef, {
      username: username,
      text: message,
      timestamp: Date.now() // 🕒 वेळ साठवली
    });
    messageInput.value = "";
  }
});
onValue(msgRef, (snapshot) => {
  messagesDiv.innerHTML = "";
  const messages = snapshot.val();

  for (let key in messages) {
    const msg = messages[key];
    const time = new Date(msg.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }); // ⏰ time format

    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${msg.username}</strong>: ${msg.text}
      <span style="float:right; font-size:12px; color:#aaa;">${time}</span>`;
    messagesDiv.appendChild(msgElement);
  }
});
// Theme Toggle Logic
const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

// Check saved theme in localStorage
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeSwitch.checked = true;
  themeLabel.textContent = "☀️ Light Mode";
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    themeLabel.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    themeLabel.textContent = "🌙 Dark Mode";
  }
});
// 🌙 Theme Toggle


if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
  themeSwitch.checked = true;
  themeLabel.textContent = "☀️ Light Mode";
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
    themeLabel.textContent = "☀️ Light Mode";
  } else {
    document.body.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
    themeLabel.textContent = "🌙 Dark Mode";
  }
});