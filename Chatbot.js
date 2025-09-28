const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChatBtn");
const historyList = document.getElementById("historyList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let chatHistory = [];

// Display message in chat
function addMessage(sender, text) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to backend
async function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("user", text);
  chatHistory.push({ sender: "user", text });

  userInput.value = "";

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });
    const data = await res.json();
    addMessage("bot", data.reply);
    chatHistory.push({ sender: "bot", text: data.reply });
  } catch (err) {
    addMessage("bot", "Error: Could not reach server");
  }
}

// New chat
newChatBtn.addEventListener("click", () => {
  chatMessages.innerHTML = "";
  chatHistory = [];
});

// Send button
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

// Search button
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = chatHistory.filter(msg => msg.text.toLowerCase().includes(query));
  chatMessages.innerHTML = "";
  filtered.forEach(msg => addMessage(msg.sender, msg.text));
});
