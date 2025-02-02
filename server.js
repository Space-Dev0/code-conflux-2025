const express = require("express");
const bodyParser = require("body-parser");
const latex = require("latex.js");
const app = express();

app.use(bodyParser.json());

app.post("/compile-latex", async (req, res) => {
    const { latex: latexCode } = req.body;

    try {
        const pdfBuffer = await latex.compile(latexCode, { format: "pdf" });
        res.setHeader("Content-Type", "application/pdf");
        res.send(pdfBuffer);
    } catch (error) {
        console.error("LaTeX compilation error:", error);
        res.status(500).send("LaTeX compilation failed.");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});