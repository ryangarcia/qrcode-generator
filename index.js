const express = require("express")
const app = express()
const bp = require("body-parser")
const qr = require("qrcode")



app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const url = req.body.url;

  // If the input is null return "Empty Data"
  if(url.length === 0) res.send("URL is empty");

  /*
    Convert the input stored in the url and return it as a representation of the 
    QR Code image contained in the Data URI.
    
    Image shall be returned in png format.

    In case of error, it will save the error inside of "err" and display it.
  */
  qr.toDataURL(url, (err, src) => {
    if (err) res.send("Error occured");

    res.render("scan", { src });
  })

});

app.listen(5000, () => console.log("Server at 5000"));