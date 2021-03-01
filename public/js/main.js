const chatForm = document.getElementById('chat-form');
const socket = io(); // Made available via script tag added in chat.html
const chatMessages = document.querySelector('.chat-messages');

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Auto scroll down to new messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Emit message to server
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="metta">Djangus <span>9:12pm</span></p>
        <p class="text">
            ${message}
        </p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}