document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const window_ = document.getElementById("chatWindow");
  const sendBtn = document.getElementById("chatSendBtn");

  function scrollToBottom() {
    window_.scrollTop = window_.scrollHeight;
  }
  scrollToBottom();

  function addBubble(role, text) {
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble " + role;
    const icon = document.createElement("i");
    icon.className = role === "assistant" ? "bi bi-robot" : "bi bi-person-fill";
    const content = document.createElement("div");
    content.textContent = text;
    bubble.appendChild(icon);
    bubble.appendChild(content);
    window_.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;

      addBubble("user", message);
      input.value = "";
      sendBtn.disabled = true;

      const typingBubble = addBubble("assistant", "Thinking...");
      typingBubble.classList.add("typing-indicator");

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: message }),
        });
        const data = await res.json();

        typingBubble.remove();

        if (!res.ok) {
          addBubble("assistant", data.error || "Something went wrong. Please try again.");
        } else {
          addBubble("assistant", data.reply);
        }
      } catch (err) {
        typingBubble.remove();
        addBubble("assistant", "Network error — please check your connection and try again.");
      } finally {
        sendBtn.disabled = false;
        input.focus();
      }
    });
  }
});
