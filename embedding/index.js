const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("public"));

// app.get("/embed", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <style>
//             body{
//                 font-family:Arial;
//                 padding:20px;
//             }

//             input{
//                 width:100%;
//                 margin:10px 0;
//                 padding:10px;
//             }

//             button{
//                 padding:10px 20px;
//             }
//         </style>
//     </head>

//     <body>

//         <h2>Apply Now</h2>

//         <input placeholder="Name"/>

//         <input placeholder="Email"/>

//         <button>Submit</button>

//     </body>
//     </html>
//   `);
// });

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});