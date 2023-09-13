const chatBox = document.querySelector(".input-text");
const user = document.getElementById("user").getAttribute("data-email");
const socket = io();

Swal.fire({
	title: "Welcome",
	text: "All chats are saved in database",
	confirmButtonText: "Join",
	allowOutsideClick: false,
	allowEscapeKey: false,
}).then(() => {
	socket.emit("user", { user, message: "Join the chat." });
});

socket.on("messagesDB", (data) => {
	let log = document.querySelector(".chat-message");
	let messages = "";
	data.forEach(message => {
		messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`;
	});
	log.innerHTML = messages;
});

chatBox.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && chatBox.value.trim().length > 0) {
		socket.emit("message", { user, message: chatBox.value });
		chatBox.value = "";
	}
});