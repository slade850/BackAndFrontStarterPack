# Back And Front Starter Pack

![Node/Express](/asset/logo/NodeExpress.png "Node / Express") 
![MySql](/asset/logo/MySQL_Logo.png "MySql")
![Parcel](/asset/logo/Parcel.png "Parcel")
![React + Redux](/asset/logo/ReactRedux.jpeg "React + Redux")


This starter pack allows you to quickly set up a web application based on a Node/Express backend, 
a Mysql database and a Frontend with react redux.
This pack uses parcel bundler instead of webPack.
The 'legacy' branch uses the original Express syntax and 'babel' branch allows to use a more modern
syntax with the babel package.

The api establishes the connection and creates the database and a users table if they do not already exist. An authentication system, with user registration, login and token verification and cookie management is included.
Front side includes pages, home, register, login and protected.
A redux store for authentication and dispatch user data.
In addition to react router I used a custom routeGuard component to protect pages that need to be authenticated to access.

To install and configure the project, after getting the package, run an "npm install" and not an "npm i", all packages will be installed and a small CLI will be launched to configure your environment variables. After that, run an 'npm run dev' for the frontend and in the api folder run 'npm run start:dev' to start the API with nodemon and enjoy!