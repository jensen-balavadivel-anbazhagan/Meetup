# MeetUp

## Author
Balavadivel Anbazhagan

### Github URL
https://github.com/jensen-balavadivel-anbazhagan/Meetup

### Publishing Service used
Heroku

### Published URL
https://meetup-bala.herokuapp.com/

### Backend service used
JSONbin.io is used as a backend service where the DB data is rendered as JSON object. Axios calls are used to fetch/update the data from the backend.


### Application information
Meetup is a web application where the user will be able to login/sign up and view all the available events happening. He/she will be able to sign up for any uncoming event, view the reviews for the past event, view all the events signed by them and write new reviews for the attended events.

The Login page is used for both login and sign up. The user is created newly in the database if not already present during the login. 

The user will be able to sign up for a new event or write a review for the attended events only when logged in. Hence will be redirected to the login page whne trying to sign up for an event without loggin in. Below are the level ups made:

**API/ database :** the app uses Jsonbin.io for processing the backend data.

**System tests and integration tests :** Test cases cover the tests to check if a certain component is available for certain data and also test the display of error message on the event of wrong input.

**Acceptance tests :** Test cases include tests to cover the navigation of the application on the event of certain actions

**Environment:** The database access url and the secret key for the backend access are stored and used seperatly from the config.json file instead of having them directly in the code.


### Reflection on the course content

This project is helpful in understanding the overall web development, starting from the requirement analysis till the deployment. It helps in widening our knowledge regarding test case writing and also to have followed coding standards where the sensitive informations such as the db secrets are kept encapsulated from the code.
The CI/CD process is practised by writing a Dockerfile which holds all the information about how the project is supposed to be build and be deployed in any Cloud service available. This project since being deployed in Heroku server I have created heroku.yml file which holds the information about the Docker file which needs to be fetched in order to build and deploy the project. Though we have not covered the full CI/CD project it is a right start where we get the motivation to explore more about the process.


### Heroku deployment process

* Create a Docker file with the scripts for building and deploying the   application.
* Create a heroku.yml file with scripts to fetch the scripts from Docker file.
* Update package.json with the start script to be used by heroku server.
* Create a new pipeline for the project in heroku.
* Select GitHub as a deployment method for the pipeline
* Connect the corresponding GitHub repository from which the application is to be build.
* Select the branch, build and deploy the project in Heroku