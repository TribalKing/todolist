This code contains two codebases: "web" contains a React app that is powered by a REST API in the "api" directory. The API uses [Knex](https://knexjs.org/) to talk to a SQLite database.

## Setup
1. Install Node: https://nodejs.org/en/download/
2. Install yarn: https://classic.yarnpkg.com/en/docs/install/#mac-stable
3. Install deps by running `yarn deps`
4. Start the app with `yarn start`

###

If all went well, you should be able to access the app at [http://localhost:3000/](http://localhost:3000/).

## Todo List App
1. To create a new task, simply enter the title in the input field and click the "Add Todo" button.
2. To modify a task, update its title in the input field and changes will be saved automatically.
3. Use the checkbox next to a task to mark it as completed.
4. Reorder tasks by clicking the up and down arrows.
