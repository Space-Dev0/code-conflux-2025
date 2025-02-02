document.getElementById("resumeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    const latexTemplate = `
    \documentclass{article}
    \begin{document}
    \section*{Resume}
    \textbf{Name:} ${name} \\
    \textbf{Email:} ${email} \\
    \textbf{Phone:} ${phone} \\
    \textbf{Address:} ${address} \\
    \end{document}
    `;

    fetch("https://api.overleaf.com/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: latexTemplate,
            compiler: "pdflatex"
        })
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error("Error generating resume:", error));
});
