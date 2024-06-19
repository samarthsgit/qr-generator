import qr from 'qr-image';
import fs from 'fs';
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at Port ${port}`);
});

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/styles.css", (req, res) => {
    res.sendFile(__dirname + "/public/styles.css");
});
app.get("/public/styles.css", (req, res) => {
    res.sendFile(__dirname + "/public/styles.css");
});
app.get("/qr_image.png", (req, res) => {
    res.sendFile(__dirname + "/qr_image.png");
});

app.post("/submit", (req, res) => {
    const url = req.body.url;
    console.log(url);
    const qr_png = qr.image(url, {type: 'png'});
    qr_png.pipe(fs.createWriteStream('qr_image.png'));
    // res.sendFile(__dirname + "/qr_image.png");
    res.sendFile(__dirname + "/response.html");
});

function generateQR() {
    const url = document.getElementById("url").value;
    console.log(url);
    const qr_png = qr.image(url, {type: 'png'});
    qr_png.pipe(fs.createWriteStream('qr_image.png'));
};
