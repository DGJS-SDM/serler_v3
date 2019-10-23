# serler_v3
A web application using Mongo DB, ExpressJS, ReactJS and NodeJS

## Intall
To install, run the following command in the root folder on your command prompt:
```
npm install
```
There is an critical issue relating to "webpack" while you try to install node modules. To resolve it, just follow the bellow step:
```
npm unintall webpack
```
Then, go to your "Node modules" folder, delete the "Webpack" and "Webpack" resource folder.
Next, install the lastest version of webpack by running the following command:
```
npm install --save-dev webpack
```

## Run
### Local

To start the application, run the following command:
```
npm start
```
Then, open web browser and go to http://localhost:3001 for the server side and http://localhost:3000 for the client side.
### Cloud deployment (Heroku)
1. Create an Heroku Account  

2. Create an App on heroku

3. Connect account to GitHub account  

4. Associate the development tool (NodeJS) app package to the deployment.  

5. Code Integration  

5.1 Make sure all the backend files are in the root folder and all the frontend files are in a subfolder called frontend or client 

5.2 Ensure the server.js (or index.js) is setup to recognise and serve up to heroku Add the follow code:  

```
const path = require("path");  

app.use(express.static(path.join(__dirname, "FrontEnd", "build")));  

and near the bottom add  

app.get("*", (req, res) => {  

res.sendFile(path.join(__dirname, "FrontEnd", "build", "index.html")); });  
```

5.3 Ensure the package.json file is setup to install into heroku Add the following code: 
```

"scripts": {  

"start": "node index.js",  

"heroku-postbuild": "cd FrontEnd && npm install --only=dev && npm install && npm run build",  

"test": "mocha"  

}, 
```
