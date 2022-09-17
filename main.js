const form = document.querySelector("form");
const select = document.querySelector("select");
const url = "https://ghibliapi.herokuapp.com/people";
const info = document.querySelector(".info");

select.addEventListener("click", (event) => {
  fetch(`${url}`)
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson);

      const randomPeople = resJson;
      randomPeople.forEach((element) => {
        const option = document.createElement("option");
        const name = element.name;
        option.textContent = name;
        option.value = name;
        select.append(option);
      });
    })
    .catch((error) => console.log(error));
});
