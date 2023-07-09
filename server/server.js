const express = require('express');
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static("pictures"))//גרמנו לשרת לזהות את התקיייה הזאת בתור התיקייה של הקבצים הסטטים באתר


app.get("/", async (req, res, next) => {
    res.json({ message: "API Running..." })
})

app.use("/api/shiduchim", apiRoutes);

app.use((err, req, res, next) => { //טיפול בשגיאות
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

require("./config/database");

async function startServer() {
    const PORT = 5000
    app.listen(PORT, () => { console.log(`Server run in port ${PORT}`) });
}

startServer();