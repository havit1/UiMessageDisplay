const express = require("express");

const app = express();

app.use(express.static("./dist/UiMessageDisplay"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/UiMessageDisplay/" });
});
app.listen(process.env.PORT || 8080);
