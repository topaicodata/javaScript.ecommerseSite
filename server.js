const express = require("express");
const path = require('path')
const app = express();
const PORT = 5000;

const fs = require('fs');

// async function uploadFile() {
//     const client = new ftp.Client();
//     client.ftp.verbose = true; //Enable logs

//     try {
//         await client.access({
//             host: "flamestees.com", //FTP server address
//             user: "bee@flamestees.com", //FTP username
//             password: "r2K}O;iRc=%0", //FTP password
//             secure: true, //true if server supports FTPS
//         });
//         console.log("Connected to FTP server");
//     } catch (error) {
//         console.log("FTP upload error", error);
//     }
// }
// uploadFile();

//Allows frontend app to request data from the backend server
// const cors = require("cors");
// app.use(cors()); //Enable CORS for frontend requests

app.use(express.static(path.join(__dirname)));

//Middleware to parse from data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//Route to handle CONTACT from submission
app.post('/api', (req, res) => {

    const { contact, email, phone } = req.body;
    console.log('Received contact:', req.body);

    //Create a data object
    const newContact = { contact, email, phone };

    const contactPath = path.join(__dirname, 'contacts.json');

    //Read existing data
    fs.readFile(contactPath, 'utf8', (err, data) => {
        let contacts = [];

        if (err) {
            if (err.code === 'ENOENT') {
                console.log('contacts.json file not found. It will be created');
            } else {
                console.error('Error reading contacts.json:', err);
                return res.status(500).json({ message: 'Error reading contact' });
            }
        } else {
            contacts = JSON.parse(data);
        }

        //Check for duplicate
        const isDuplicate = contacts.some(contactItem => {
            return (
                contactItem.contact === contact &&
                contactItem.email === email &&
                contactItem.phone === phone
            );
        });

        if (isDuplicate) {
            console.log('Welcome back!');
            return res.status(409).json({ message: 'Contact already exists!'});
        }

        //Add new contact to array
        contacts.push(newContact);

        //Save updated contacts back to the file
        fs.writeFile(contactPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).json({ message: 'Error saving contact' });
            }
            res.status(200).json({ message: 'Form submitted and contact saved!' });
        });
    });

});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
