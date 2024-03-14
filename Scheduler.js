class Scheduler {
  constructor() {
    this.theaterHours = {
      Monday: { open: 8 * 60, close: 23 * 60 },
      Tuesday: { open: 8 * 60, close: 23 * 60 },
      Wednesday: { open: 8 * 60, close: 23 * 60 },
      Thursday: { open: 8 * 60, close: 23 * 60 },
      Friday: { open: 10.5 * 60, close: 23.5 * 60 },
      Saturday: { open: 10.5 * 60, close: 23.5 * 60 },
      Sunday: { open: 10.5 * 60, close: 23.5 * 60 },
    };
    this.setupTime = 60;
    this.cleanupTime = 35;
    this.movies = [];
    this.schedule = {};
  }

  setMovies(movies) {
    this.movies = movies;
  }

  calculateMovieEndTimes(startTime, runTime) {
    return startTime + runTime;
  }

  adjustToNearestFive(minutes) {
    return minutes - (minutes % 5);
  }

  makeDailySchedule(day) {
    this.schedule[day] = [];
    const { open, close } = this.theaterHours[day];

    this.movies.forEach((movie) => {
      let totalTimePerShowing = movie.runTime + this.cleanupTime;
      let latestStart = close - movie.runTime;
      latestStart = this.adjustToNearestFive(latestStart);

      while (latestStart - totalTimePerShowing >= open - this.setupTime) {
        if (latestStart >= open + this.setupTime) {
          let startTime = latestStart;
          let endTime = this.calculateMovieEndTimes(startTime, movie.runTime);

          this.schedule[day].unshift({
            movie: movie.title,
            startTime: startTime,
            endTime: endTime,
          });

          latestStart = this.adjustToNearestFive(
            latestStart - totalTimePerShowing
          );
        } else {
          break;
        }
      }
    });
  }

  printSchedule() {
    for (const day in this.schedule) {
      console.log(`${day}:`);
      const showings = this.schedule[day];

      this.movies.forEach((movie) => {
        const movieShowings = showings.filter(
          (showing) => showing.movie === movie.title
        );
        if (movieShowings.length > 0) {
          console.log(`${movie.title} - ${movie.runTime} minutes`);
          movieShowings.forEach((showing) => {
            const startTime = this.formatTime(showing.startTime);
            const endTime = this.formatTime(showing.endTime);
            console.log(`  ${startTime} - ${endTime}`);
          });
        }
      });
    }
  }

  formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }
}

module.exports = Scheduler;
