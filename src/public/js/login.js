const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const data = new FormData(loginForm);
	const obj = {};
	data.forEach((value, key) => (obj[key] = value))

	await fetch("/api/sessions/login", {
		method: "POST",
		body: JSON.stringify(obj),
		headers: {
			"Content-Type": "application/json",
		},
	}).then(res => {
		if (res.status !== 200) {
			alert(`Contraseña incorrecta`);
		} else {
			alert(`Login correcto`);
			window.location.replace("/");
		};
	}).catch(err => {return `error: ${err}`});
});
