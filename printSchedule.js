const inquirer = require("inquirer");
const Scheduler = require("./Scheduler");
const parseMovies = require("./parseMovies");
const path = require("path");

async function promptForDay() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "day",
      message: "Choose a day to see the movie schedule:",
      choices: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ]);

  return answers.day;
}

function makePromptedSchedule(inputFile, day) {
  const movies = parseMovies(inputFile);

  const scheduler = new Scheduler();
  scheduler.setMovies(movies);
  scheduler.makeDailySchedule(day);
  scheduler.printSchedule();
}

async function main() {
  let inputFile;
  if (process.argv.length >= 3) {
    inputFile = process.argv[2];
    console.log(`Grabbing movie data from: ${inputFile}`);
  } else {
    inputFile = path.join(__dirname, "input.txt");
    console.log(`No file path provided. CURRENT FILE is: ${inputFile}`);
  }

  const day = await promptForDay();
  console.log(`The theater's schedule for: ${day}`);

  makePromptedSchedule(inputFile, day);
}

main().catch((err) => console.error(err));
