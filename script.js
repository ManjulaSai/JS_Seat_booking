const seatsLeft = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.querySelector(".container");
const Count = document.getElementById("count");
const totalPrice = document.querySelector("#total");
//console.log(totalPrice);
const movieSelect = document.getElementById("movie");

populateUI();
let ticketPrice = +movie.value;
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatsSelected"));
  if (selectedSeats.length !== null && selectedSeats.length > 0) {
    seatsLeft.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//console.log(movie);
setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
};
updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  console.log(selectedSeats);
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seatsLeft].indexOf(seat);
  });
  localStorage.setItem("seatsSelected", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  Count.innerText = selectedSeatsCount;
  totalPrice.innerText = selectedSeatsCount * ticketPrice;
};

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, +e.target.value);
});

container.addEventListener("click", (e) => {
  console.log(e);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
    //totalPrice = totalPrice + ticketPrice;
  }
});

updateSelectedCount();
