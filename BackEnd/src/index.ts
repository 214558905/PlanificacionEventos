

import Server from "./app";
import "./models/asosations";
//import "./libs/initialSetup";
if(process.env.NODE_ENV != 'production'){ 
    require('dotenv').config();
  }


const server = new Server();
