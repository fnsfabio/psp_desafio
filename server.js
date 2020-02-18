const express = require('express');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/', (req, res) => {
    res.json({message: 'REST API PSP'})
});

require('./routes/index')(app);

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}.`);
});

module.exports = app;