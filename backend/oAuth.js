const express = require("express");
const axios = require("axios");
var cors = require("cors");

const CLIENT_ID = "Ov23liRc1COTIDe523zr";
const CLIENT_SECRET = "4bd298031b5a67e491240134b8b28c8d852ae166";
const GITHUB_URL = "https://github.com/login/oauth/access_token";

const app = express();
app.use(cors({ credentials: true, origin: true }));

app.get("/oauth/redirect", (req, res) => {
  axios({
    method: "POST",
    url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
    headers: {
      Accept: "application/json",
    },
  }).then((response) => {
    console.log(response.data);
    res.redirect(
      `http://localhost:5173?access_token=${response.data.access_token}`
    );
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
