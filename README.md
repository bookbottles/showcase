# AngularJS Skill Showcase

The objective of this test is to showcase your AngularJS knowledge by building a simple, single-page application. 
The parameters of this test will be fairly open-ended, with a few specific requirements to demonstrate your Javascript 
prowess.

### Getting Started

Please begin by forking (please do not clone, forking allows us to see your changes more easily) this repo to your own Github account. You'll push changes to your own repo and we'll 
review from there.

You will need to have npm installed. Clone the repository locally and run `npm install`. You can then 
run `npm start` to start the default gulp task. This is a build task which you can keep running during 
development. If everything worked, your browser will automatically open the app at [localhost:3444](localhost:3444).

I've setup the structure of the application already for you. Your work should happen in the `src` 
folder. The app has two states right now, each with a template just to get you started. The signup
module has an example controller and service scaffolded as well.

[Browserify](http://browserify.org/) is used in this project to create the final javascript bundle. If you
want to include additional npm dependencies, make sure to use `require`.

### The Task

* Build a single-page application which leverages [ui-router](https://github.com/angular-ui/ui-router) with 3 main states: Login, 
Sign Up, and Dashboard.

* Login and Sign Up need not connect to any backend. Use a **service** to return a mock server response.

* The Sign Up page should require a username, password, and password confirmation.

* Login should accept a username/password combo of bookbottles/showcase. Anything else should be rejected 
with appropriate error messages.

* The dashboard should only be accessible after a user has signed up or logged in.

* The dashboard should retrieve and display simple data from any web API of your choice. Use 
a **service** as an API wrapper and use at least one custom **directive** to display data.

* Bonus points awarded if your data comes from a [Firebase](https://www.firebase.com/) instance.
 
### Final Words
* This project uses gulp to assist with development. The build task will copy the appropriate files to 
the build directory, covert templates to inline HTML, build the index.html file, and serve it up using Express.

* Styling is important, but shouldn't be your focus. I have included Bootstrap as an import 
in the `src/less/main.less` file. Add your own CSS and/or use another framework if you wish.

* Login persistence is not important for this project.

* Please spend 2 hours at most on this project. Do not make it too complicated.
