const express = require('express'); //used for express server
const bodyParser = require('body-parser'); //used for handling/ parsing the incoming bodies
const fs = require('fs').promises; // used for promisified fs for async operations

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send("To Read File go to readFile/file.txt, To Read File go to writeFile/file.txt and To Read File go to updateFile/file.txt");
});

// ReadFile Endpoint (GET /readFile)
app.get('/readFile/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const data = await fs.readFile(filename, 'utf8');
        res.send(data);
    } catch (error) {
        res.status(404).send('File not found');
    }
});

// WriteFile Endpoint (POST /writeFile)
app.post('/writeFile/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const { data } = req.body;
    
        if (!data) {
            return res.status(400).send('No content in "data" field');
        }

        await fs.writeFile(filename, data, 'utf8');
        res.send('File written successfully');
        } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// UpdateFile Endpoint (PUT /updateFile)
app.put('/updateFile/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        const { data } = req.body;

        if (!data) {
            return res.status(400).send('No data in "content" field');
        }

        await fs.appendFile(filename, '\n' + data, 'utf8');
        res.send('File updated successfully');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
});
