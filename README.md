# Forage-Compass

## Dependencies

This project requires certain dependencies to operate so make sure to call ```npm install``` inside both ```.\Forage-Compass```, ```.\Forage-Compass\forageapi``` directory.

- List of modules in ```.\Forage-Compass```
  - axios
  - google-map-react
  - react
  - react-dom
  - react-icon
  - react-router-dom
  - react-script
  - web-vitals

- List of modules in ```.\Forage-Compass\forageapi```
  - body-parser
  - cookie-parser
  - cors
  - debug
  - dotenv
  - express
  - http-errors
  - mongodb
  - morgan
  - pug
  - swagger-ui-express
  - yamljs

## Scripts

- List of scripts
  - ```npm start```: ```cd forageapi && node app.js``` This script starts up the server within the ```.\Forage-Compass\forageapi```
  - ```npm build```: ```react-scripts build``` This script to ensures that the finished project is bundled, minified and optimized with best practices
  - ```npm heroku-postbuild```: ```cd forageapi && npm install && cd .. && npm run build```This script installs the dependencies required in ```\Forage-Compass\forageapi```
  - ```npm test```: ```react-scripts test``` This script enables you to launch the test runner in interactive watch mode
  - ```npm eject```: ```react-scripts eject``` This script will remove the single build dependency from your project

## Requirements

Project requires two ```.env``` file positioned in ```.\Forage-Compass``` and ```.\Forage-Compass\forageapi``` directories. 

- ```.env``` file positioned in ```.\Forage-Compass``` directory 
  - ```REACT_APP_GOOGLE_API_KEY=``` field that has developer's **google map api key**.

- ```.env``` file positioned in ```.\Forage-Compass\forageapi``` directory
  - ```HOST=localhost``` Host name field that has can access the server's data 
  - ```PORT=3001``` Port of the host field that has can access the server's data
  - ```DEBUG=forageapi:server``` When needs to be debugged
  - ```DB_NAME=forager``` Name of the server
  - ```DB_USER=``` Username of the server
  - ```DB_PWD=``` Password of the user

## Directory / File

- ```.\Forage-Compass\forageapi```: ******* Mark ************


- ```.\Forage-Compass```: Contains ```App.js``` that stores the ```check``` state which stores the checkbox status in ***Map***. Also it creates a props that contains the checkbox status and data retrieved from the ```Popup.js``` into ```MapContainer.js```. ```App.js``` also uses ```react-router-dom``` to switch to different page when specific URL paths are taken.

  - ```.\Forage-Compass\components```: Contains ```Navbar.js``` that implements Navigation bar on the top of the website and gives ```onClick``` functionality to the two icons on the far left and far right side.

    - ```.\Forage-Compass\components\map```: ******* Camilo ************

    - ```.\Forage-Compass\components\LeftMenu```: Contains ```CheckContext.js``` for ```useContext()``` to pass left menu's checkbox information. ```Leftbar.js``` implements toggle functionality to close and open the left menu and also maps out all the left menu content from ```LeftBarData.js```. ```LeftSubMenu.js``` maps out the ```subNav``` data from if it exists in ```LeftBarData.js``` and also set the ```check``` context with the clicked checkbox value when its clicked.

    - ```.\Forage-Compass\components\Popup```: Contains ```Popup.js``` which creates a pop form that takes the user's input and combine it with the ```navigator.geolocation```'s current position and create ```POST``` to server via ```axios```.

    - ```.\Forage-Compass\components\RightMenu```: Contains ```Rightbar.js``` which contains data path names for ```react-router-dom``` to use for switch


