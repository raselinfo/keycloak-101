require("dotenv").config();
const KeyCloak = require("keycloak-connect");
const express = require("express");
const keycloakConfig = require("./keycloak.config.js");
const cors=require("cors")
let webinars = require("./db");
const app = express();

app.use(cors({
  origin:"http://localhost:3000"
}))
app.use(express.json())
// app.use(express.urlencoded({extended:true}))

const keycloak = new KeyCloak({}, keycloakConfig);
app.use(keycloak.middleware());

// Get all webinars
app.get(
  "/webinars",
   keycloak.protect('realm:user'),
  async (req, res) => {
    const token_details = req.kauth.grant.access_token.content;
    console.log(token_details);
    // console.log("Get Webinar Route",req.headers)
    res.status(200).json({ message: "Webinars", webinars });
  }
);


// Get single webinar
app.get("/webinars/:id",keycloak.protect("realm:user"), (req, res) => {
  try {
    const { id } = req.params;
    const webinar = webinars.find((w) => w.id === parseInt(id));

    if (!webinar) {
      throw new Error("Webinar not found");
    }

    res.status(200).json({ message: "Webinar", webinar });

  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// Create Webinar
app.post("/webinars", keycloak.protect("realm:creator"),(req, res) => {
  try {
    console.log(">>>create webinar", req.headers);
    const { name, description, date, price } = req.body;

    if (!name || !description || !date || !price) {
      throw new Error("Please fill all fields");
    }

    const id = webinars.length + 1;
    const webinar = { id, name, description, date, price };
    webinars.push(webinar);
    //  console.log(">>>created webinar", webinar);
    res.status(201).json({ message: "Webinar created", webinar });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});

// Update Webinar
app.patch("/webinars/:id",keycloak.protect("realm:creator"), (req, res) => {
  try {
    const { id } = req.params;
    const findWebinar = webinars.find((w) => w.id === parseInt(id));
    const index=webinars.findIndex(w=>w.id===parseInt(id))
    const updatedWebinar = {
      id: findWebinar.id,
      name: req.body.name || findWebinar.name,
      description: req.body.description || findWebinar.description,
      date: req.body.date || findWebinar.date,
      price: req.body.price || findWebinar.price,
    };

    webinars[index]=updatedWebinar

    res.status(200).json({ message: "Webinar updated", updatedWebinar });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});


// Delete Webinar
app.delete("/webinars/:id", keycloak.protect("realm:admin"),(req, res) => {
    try{
        const {id} = req.params
        const new_webinars=webinars.filter(w=>w.id!==parseInt(id))
        webinars=new_webinars
        res.status(200).json({ message: "Webinar deleted", new_webinars });
    }catch(err){
        res.status(500).json({message:err.message || "Server error"})
    }
})



app.listen(4000, () => {
  console.log("http://localhost:4000");
});
