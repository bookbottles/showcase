# AngularJS Skill Showcase

The objective of this test is to showcase your AngularJS knowledge by building a simple, single-page application. 
The parameters of this test will be fairly open-ended, with a few specific requirements to demonstrate your Javascript 
prowess.

### Getting Started

Please begin by forking this repo to your own Github account. You'll push changes to your own repo and we'll 
review from there.

Grunt, npm, and bower are required. Clone the repository locally and run `npm install`. You can then 
run `npm start` to start the default grunt task. This is a build task which you can keep running during 
development. If everything worked, you should be able to open the app at [localhost:3444](http://localhost:3444).

I've setup the structure of the application already for you. Your work should happen in the `src` 
folder. The app has two states right now, each with a template just to get you started. Feel free to 
discard those completely if you wish.

### The Task

* Build a single-page application which leverages [ui-router](https://github.com/angular-ui/ui-router) with 3 main states: Login, 
Sign Up, and Dashboard.

* Login and Sign Up need not connect to any backend. Use a **service** to return a mock server response.

* The Sign Up page should require a username, password, and password confirmation.

* Login should accept a username/password combo of bookbottles/showcase. Anything else should be rejected 
with appropriate error messages.

* The dashboard should only be accessible after a user has signed up or logged in.

* The dashboard should display data from any public API of your choice (e.g. Twitter, HackerNews). Use 
a **service** as an API wrapper and use at least one custom **directive** to display data.
 
### Final Words
* This project uses grunt to assist with development. The build task will copy the appropriate files to 
the build directory, covert templates to JS, build the index.html file, and serve it up using Express. Because
grunt is awesome, you can setup your files in the `src` folder however you like.

* Styling is important, but shouldn't be your focus. Feel free to use Bootstrap, Foundation, or any other 
framework. You can install via bower and include their files in the `src/less/main.less` file.
```less
@import "../../vendor/bootstrap/less/bootstrap.less";
```

* Login persistence is not important for this project.

* Please spend 2 hours at most on this project. Do not make it too complicated.
