const express = require("express");
const app = express();

app.get('/', (req, res)=>{
    res.send({hi: 'there'})
});

// Server Setup
const PORT = process.env.PORT || 3001;
console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
app.listen(PORT);
