document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const pseudo = document.getElementById("pseudo").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");
    message.textContent = "Création du compte...";
    message.style.color = "black";

    try {
        const response = await fetch("https://corpo-backend.onrender.com/account/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pseudo: pseudo,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = "Compte créé avec succès ! 🎉 Vérifie ton email.";
            message.style.color = "green";

            document.getElementById("registerForm").reset();
        } else {
            message.textContent = data.detail || "Erreur lors de la création du compte.";
            message.style.color = "red";
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Impossible de contacter le serveur.";
        message.style.color = "red";
    }
});
