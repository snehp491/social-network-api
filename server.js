const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})