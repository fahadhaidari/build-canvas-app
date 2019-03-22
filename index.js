#!/usr/bin/env node

(() => {
  const fs = require("fs");
  const dir_name = process.argv.slice(2)[0] || "canvas-app";

  const files = [
    {
      name: "index.html",
      content: `
        <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" type="text/css" href="style.css">
            <title>Canvas App Template</title>
          </head>
          <body>
            <canvas id="canvas"></canvas>
            <script src="index.js"></script>
          </body>
        </html>`
    },
    {
      name: "index.js",
      content: `
        window.onload = function() {
            const canvas = document.getElementById("canvas");
            const context = canvas.getContext("2d");
      
            canvas.width = 400;
            canvas.height = 400;
      
            const update = function() {};
            const draw = function() {};
      
            const frame = function() {
              update();
              draw();
              requestAnimationFrame(frame);
            };
          }`
    },
    {
      name: "style.css",
      content: `
        html, body {
          background: #000000;
        }
        canvas {
          display: block;
          margin: 0 auto;
          background: #111111;
        }`
    }
  ];

  const deleteFolderRecursive = function(path) {
    if(fs.existsSync(path)) {
      fs.readdirSync(path).forEach(function(file){
        var curPath = path + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  };

  deleteFolderRecursive(dir_name);

  fs.mkdirSync(dir_name);
  files.forEach(file => {
    fs.appendFile(`./${dir_name}/${file.name}`, file.content, function (err) {
      if (err) throw err;
    });
  });
})();