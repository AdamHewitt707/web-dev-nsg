const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public-files'));


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})

app.get('/', (req, res) => {
    // res.send('Welcome to the NodeJS');
    res.sendFile('index.html', (err) => {
        if (err) {
            console.log(err);
        }
    });
})


app.post('/sign-up', (req, res) => {
    //form processing
    console.log(req.body);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const comments = req.body.comments;
    res.json({firstName:firstName, lastName:lastName, email:email, comments:comments});
});
