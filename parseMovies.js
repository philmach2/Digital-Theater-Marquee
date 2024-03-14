const fs = require("fs");
const Movie = require("./Movie");

function parseMovies(inputFile) {
  let movies = [];
  const inputContent = fs.readFileSync(inputFile, "utf-8");
  const lines = inputContent.split("\n");

  for (let i = 1; i < lines.length; i++) {
    const [title, year, rating, runTime] = lines[i].split(", ");
    const yearNumber = Number(year);
    const [hours, minutes] = runTime.split(":").map(Number);
    const runTimeMinutes = hours * 60 + minutes;
    const movie = new Movie(title, yearNumber, rating, runTimeMinutes);
    movies.push(movie);
  }
  return movies;
}

// const visualTest = parseMovies("./input.txt");
// console.log(visualTest);

module.exports = parseMovies;
