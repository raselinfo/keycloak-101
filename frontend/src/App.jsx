
import './App.css'
import axios from "axios"
import jwt_decode from "jwt-decode"
function App() {
  // get qurey params from url
  const urlParams = new URLSearchParams(window.location.search);
  
const id_token=urlParams.get("id_token") 
const access_token=urlParams.get("access_token") 
const refresh_token=urlParams.get("refresh_token") 


return (
   <div>
    <h1>Protect your Microservice with KeyCloak</h1>
    <a href="http://localhost:4000/login">Login</a>
    {" | "}
    <a href={`http://localhost:4000/logout?id_token=${id_token}`}>Logout</a>
    <hr></hr>
    {id_token && <>
    <p>Id Token: <code>{JSON.stringify(jwt_decode(id_token))}</code></p>
    <p>Access Token: <code>{JSON.stringify(jwt_decode(access_token))}</code></p>
    <p>Refresh Token: <code>{JSON.stringify(jwt_decode(refresh_token))}</code></p>
    </>}
    
   </div>
  )
}

export default App
