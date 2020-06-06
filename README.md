# Shopping Assignment Backend - Node JS

An API written in Express.

## Installation

### Install node

* OSX: `brew install node`
* Ubuntu: `apt-get install nodejs`

### Install dependencies

You will need to use npm here. 

You can find the list of dependencies for any Node project in its `package.json` file. To install them, simply
run:

```
npm install
```
Also Install the dependencies if not installed properly

This will download all the Node libraries you need, and place them into the `node_modules/`
directory at the base of the project. `node` can access them so long as you run it in somewhere in
the project dir; if you want to see for yourself, open the Node REPL by running `node` with no
arguments while in the project directory, and try running `const l = require('lodash')`—it will
place the `lodash` library in the `l` variable.

## Running...


### ... the development server

Run this command (which is defined in the `scripts` section of `package.json`):

```
npm run dev-start
```

Et voilà! Visit [localhost:3000](http://localhost:3000) to see everything in action.

#### Debugger

If you are using VSCode, after running the dev server in your
terminal, you can attach the VSCode debugger by clicking the
debug panel and then hitting the play button using the
"Attach debugger" configuration.

Otherwise, you can figure out how to attach your own debugger to
Node's built-in inspector, which should work on port 9229. I hear
you can use Chrome to do this, but I haven't researched how.

To insert a breakpoint, just add the line `debugger` to your code.

### Pull Request Workflow

For every feature this is how you should work -

1. You are on master
2. `git pull`
3. `git checkout -b <branch_name>`
4. Make your changes
5. `git add -A`
6. `git commit -m "put in a commit message"`
7. The first time that you push a branch, you need to run `git push -u origin <branch_name>`
   For ALL OTHER TIMES, you just need to do `git push`
8. In Github, OPEN A NEW PULL REQUEST.
9. Get somebody (your team lead) to REVIEW THE CODE.


### ... the server

Ensure all the proper environment variables are present, and then run:

```
npm start
```

#### Required environment variables

Until you add more, these ones are *necessary* for a production deploy:

* `PRIVKEY_CERT_LOC` and `FULLCHAIN_CERT_LOC`: Location of
  SSL certificate files, as produced by LetsEncrypt's `autocert`
  script
* `JWT_SECRET`: The secret used to produce JSON Web Tokens


### Sample API Request and Response will be updated...
