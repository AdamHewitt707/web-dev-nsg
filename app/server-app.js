const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public-files'));


app.get('/', (req, res) => {
    // res.send('Welcome to the NodeJS');
    res.sendFile('index.html', (err) => {
        if (err) {
            console.log(err);
        }
    });
})





app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})