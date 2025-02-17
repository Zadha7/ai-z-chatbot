<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title> ZAdha Chatbot </title>
  <link
    href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.3/dist/tailwind.min.css"
    rel="stylesheet"
  />
  <style>
    /* Custom dark theme styles */
    .dark-theme {
      background-color: #1a202c; /* Dark background */
      color: #e2e8f0; /* Light text */
    }
    .dark-theme input {
      background-color: #2d3748; /* Dark input background */
      color: #e2e8f0; /* Light text */
      border-color: #4a5568; /* Dark border */
    }
    .dark-theme .chatbox {
      background-color: #2d3748; /* Dark chatbox background */
    }
    .dark-theme .message-left {
      background-color: #4a5568; /* Dark message background for left-aligned messages */
      color: #e2e8f0;
    }
    .dark-theme .message-right {
      background-color: #4299e1; /* Blue message background for right-aligned messages */
      color: #e2e8f0;
    }
  </style>
</head>
<body class="dark-theme flex flex-col min-h-screen">
  <div class="flex-grow container mx-auto py-6 px-4">
    <div class="h-full w-full max-w-2xl mx-auto">
      <div id="chatbox" class="flex flex-col items-start overflow-y-auto h-full p-1 rounded"></div>
    </div>
  </div>
  <div class="sticky bottom-0 w-full">
    <div class="flex justify-center">
      <div class="px-2 w-full max-w-2xl">
        <div class="flex flex-col my-5">
          <input
            class="shadow flex-grow rounded p-2 mb-2 shadow appearance-none border rounded w-full leading-tight focus:outline-none focus:shadow-outline"
            id="messageInput"
            type="text"
            placeholder="Type your message"
          />
          <div class="flex justify-between space-x-2">
            <button
              class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded w-full sm:w-auto"
              id="clearButton"
            >
              Clear Chat
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full sm:w-auto"
              id="sendButton"
            >
              Ask Dom!
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    const chatbox = document.getElementById("chatbox");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const clearButton = document.getElementById("clearButton");
    const chatId = crypto.randomUUID();
    let websocket = null;

    let receiving = false;
    const systemPrompt = "You are Dominic Toretto, a street racer and skilled mechanic known for your loyalty to family and friends.";

    function createMessageElement(text, alignment) {
      const messageElement = document.createElement("div");
      messageElement.className = `inline-block my-2.5 p-2.5 rounded border ${
        alignment === "left" ? "self-start message-left" : "self-end message-right"
      }`;
      messageElement.textContent = text;
      return messageElement;
    }

    function connectWebSocket(message, initChat) {
      receiving = true;
      sendButton.textContent = "Cancel";
      const url = "wss://backend.buildpicoapps.com/api/chatbot/chat";
      websocket = new WebSocket(url);

      websocket.addEventListener("open", () => {
        websocket.send(
          JSON.stringify({
            chatId: chatId,
            appId: "wide-dog",
            systemPrompt: systemPrompt,
            message: initChat ? "A very short welcome message from Dominic Toretto" : message,
          })
        );
      });

      const messageElement = createMessageElement("", "left");
      chatbox.appendChild(messageElement);

      websocket.onmessage = (event) => {
        messageElement.textContent += event.data;
        chatbox.scrollTop = chatbox.scrollHeight;
      };

      websocket.onclose = (event) => {
        if (event.code === 1000) {
          receiving = false;
          sendButton.textContent = "Ask Dom!";
        } else {
          messageElement.textContent += "Error getting response from server. Refresh the page and try again.";
          chatbox.scrollTop = chatbox.scrollHeight;
          receiving = false;
          sendButton.textContent = "Ask Dom!";
        }
      };
    }

    function createWelcomeMessage() {
        connectWebSocket("", true);
    }

    sendButton.addEventListener("click", () => {
      if (!receiving && messageInput.value.trim() !== "") {
        const messageText = messageInput.value.trim();
        messageInput.value = "";
        const messageElement = createMessageElement(messageText, "right");
        chatbox.appendChild(messageElement);
        chatbox.scrollTop = chatbox.scrollHeight;

        connectWebSocket(messageText, false);
      } else if (receiving && websocket) {
        websocket.close(1000);
        receiving = false;
        sendButton.textContent = "Ask Dom!";
      }
    });

    messageInput.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" &&
        !receiving &&
        messageInput.value.trim() !== ""
      ) {
        event.preventDefault();
        sendButton.click();
      }
    });

    clearButton.addEventListener("click", () => {
      chatbox.innerHTML = "";
    });

    createWelcomeMessage();
  </script>
</body>
</html>
