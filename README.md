UrlShortnerApp: - api (.Net 6.0) - web-ui (React/TS)

1. Download and install the following:

   Docker Desktop
   https://docs.docker.com/desktop/windows/install/

   .Net 6.0 SDK
   https://dotnet.microsoft.com/en-us/download

   Node.js
   https://nodejs.org/en/download/

   Visual Studio Code
   https://code.visualstudio.com/Download

2. Clone git repository and open project in VS Code

   https://github.com/wpudlo-23/UrlShortnerApp.git

3. Open 3 VS Code Terminal Windows and run these commands in this order:

   Terminal 1 (api):

   cd api

   dotnet restore

   docker build -t urlshortnerapp/api:latest .

   Terminal 2 (web-ui):

   cd web-ui

   npm install

   npm install -g typescript

   docker build -t urlshortnerapp/web-ui:latest .

   Terminal 3: (root)

   docker-compose up

After you run the docker-compose 3 containers will spool up and everything should work:

1. MS Sql Server Container

   SQL Client Login:

   server: localhost\ms-sql-server,1433

   User: sa

   Password: Pa65yH12Ws

2. Api Container
   http://localhost:3001

3. Web UI (React App)
   http://localhost:3000

   CTRL + C will stop the containers
