const express=require("express")
const cors=require("cors")
const Keycloak = require("keycloak-connect");
const axios=require("axios")
const app=express()

app.use(cors({
    origin:["http://localhost:5173","http://localhost:3000","http://localhost:4000"]
}))
app.use(express.json())

const CLIENT_URL='http://localhost:5173'
const CALLBACK_URL='http://localhost:4000/callback'

const keycloak = new Keycloak(
  {},
  {
    // Keycloak configuration
    realm: "webinar-realm",
    "auth-server-url": "http://localhost:8180/auth",
    "ssl-required": "external",
    resource: "webinar-backend", // The client id that you specified in Keycloak
    "bearer-only": true, // This indicates that this is a backend service
    secret: "bb293dc3-1493-4067-a8a5-4de36f529f19", // this is the client secret
  }
);

app.use(
  keycloak.middleware({
    logout: "/logout",
    // admin: "/",
    
    
  })
);

// Database
const webinars=[
    {
        id:"346gsgsg",
        title:"React",
        content:"345346",
        user:{
            id:"345345",
            name:"John Doe"
        }
    }
]


// Logout
app.get("/logout", (req,res)=>{
   try{
     const {id_token}=req.query
    res.redirect(`http://localhost:8180/auth/realms/webinar-realm/protocol/openid-connect/logout?id_token_hint=${id_token}&post_logout_redirect_uri=${CLIENT_URL}`)
 
   }catch(err){
        res.send("<h1>Logout Failed")
   }
})

// Login
app.get("/login", (req, res) => {
  res.redirect(
    `http://localhost:8180/auth/realms/webinar-realm/protocol/openid-connect/auth?client_id=webinar-backend&redirect_uri=${CALLBACK_URL}&response_type=code&scope=openid`
  );
});

// Redirect after login
app.get("/callback",async (req, res) => {
  try{


const postData = new URLSearchParams();
postData.append("grant_type", "authorization_code");
postData.append("client_id", "webinar-backend");
postData.append("client_secret", "bb293dc3-1493-4067-a8a5-4de36f529f19");
postData.append(
  "code",
  req.query.code.trim()
);
postData.append("redirect_uri", CALLBACK_URL);

const result = await axios.post(
  "http://localhost:8180/auth/realms/webinar-realm/protocol/openid-connect/token",
  postData,
  {
    "Content-Type": "application/x-www-form-urlencoded",
  }
);

const { id_token, refresh_token, access_token } = result.data;

res.redirect(CLIENT_URL + `?id_token=${id_token}&refresh_token=${refresh_token}&access_token=${access_token}`)

  }catch(err){
    // res.send("<h1>Login Failed")
    res.redirect(`http://localhost:4000/login`)
  }
});

// Public Route
app.get("/",(req,res)=>{
    res.status(200).json({message:"ok",code:200,data:[...webinars]})
})


// private route
app.post("/webinars",(req,res)=>{
    const {title,content,user}=req.body
    const webinar={
        id:Date.now().toString(),
        title,
        content,
        user
    }
    webinars.push(webinar)
    res.status(201).json({message:"ok",code:201,data:webinar})
})

app.listen(4000,()=>{
    console.log("http://localhost:4000")
})