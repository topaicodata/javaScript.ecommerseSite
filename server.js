const express = require("express");
const path = require('path')
const app = express();
const PORT = 5000;

//Allows frontend app to request data from the backend server
const cors = require("cors");
app.use(cors()); //Enable CORS for frontend requests

const api = [
    { id: 1, name: "Printed tees" },
    { id: 2, name: "NepalFlag printed halfsleeve" },
    { id: 3, name: "Metallica printed halfsleeve" },
    { id: 4, name: "Fucupcake printed halfsleeve" },
    { id: 5, name: "Pahelo batti muni printed halfsleeve" },
];

//"Routing" to return JSON data - API Endpoint
app.get("/api/data", (req, res) => {
    console.log("Sending data: ", api);
    res.json(api);
});

app.use(express.static(path.join(__dirname)));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// //Middleware
// app.use(express.json());//Allow JSON requests