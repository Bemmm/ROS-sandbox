# Project structure
- app
  - src
    - api
      - authorization.js
      - validation.js
    - config
      - config.js *(all project constants, server configuratios and secrets)*
      - index.js *(export as one module)*
      - realm.js *(connection to realm)*
    - helpers *(all repeatable function)*
      - error-handler.js *(function which returns the first value of express-validator)*
      - index.js *(export as a module)*
    - models
      - user.js *(user constructor with userShema, used in realm.io and other helpfull methods)*
    - repository
      - repository.js *(service where the project has methods to communicate with the realm database)*
    - server
      - server.js *(all server settings, api, middlewares, etc..)*
  - .eslintrc.json *("code-checker" file, please install eslint on your editor, added precommit-hooks)*
  - .gitignore.json *(all files ignored by git)*
  - package.json *(all modules and packages used in the project)*
  - Dockerfile *(docker config)*
# How to run?
### You have to have already installed:
  * Docker
  * Git
### To start the porject follow this steps:
1. clone the repository: git clone https://github.com/Bemmm/ROS-sandbox.git
2. Move inside the created directory
3. Build: docker build -t ros .
4. Start: docker run -p 3000:3000 ros
5. Server started at localhost:3000

# API documentation
 ## **POST** http://localhost:3000/login
### Requires:
- *email* 
- *password*
### Returns JSON:
 - *email*
 - *x-access-token*
 - userId
 
  ## **GET** http://localhost:3000/:userId 
### Requires:
- *userID* - as parameter
- *x-access-token* - as a header
### Returns JSON:
 - *email*
 - *userId*
