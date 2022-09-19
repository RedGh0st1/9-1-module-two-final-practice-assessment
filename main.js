const form = document.querySelector("form");
const select = document.querySelector("select");
const url = "https://ghibliapi.herokuapp.com/people";
const info = document.querySelector("#info");
const section = document.querySelector("section");
const ul = document.querySelector("ul");

fetch(`${url}`)
  .then((res) => res.json())
  .then((resJson) => {
    console.log(resJson);

    const randomPeople = resJson;
    randomPeople.forEach((element) => {
      const option = document.createElement("option");
      const names = element.name;
      option.textContent = names;
      option.value = names;
      select.append(option);
    });
  })
  .catch((error) => console.log(error));

select.addEventListener("change", (event) => {
  event.preventDefault();
  // console.log(event);

  if (document.querySelector(".err")) {
    document.querySelector(".err").remove();
  }

  fetch(`${url}`)
    .then((res) => res.json())
    .then((resJson) => {
      const people = resJson;
      console.log(select.value);
      people.forEach((element) => {
        if (select.value === element.name) {
          document.querySelector("#info").innerHTML = `
         <h4>Name: ${element.name}</h4>
        <p>age: ${element.age}</p>
        <p>eye color: ${element.eye_color}</p>
        <p>Hair Color: ${element.hair_color}</p>`;
          //  console.log(name, age, eye, hair);
        }
      });
    })
    .catch((error) => console.log(error));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (document.querySelector(".err2")) {
    document.querySelector(".err2").remove();
  }

  const li = document.createElement("li");
  li.innerHTML = `<strong>${select.value}</strong>: ${event.target.shoutout.value}`;
  ul.append(li);

  if (select.value === "") {
    const error = document.createElement("p");
    error.classList.add("err");
    error.innerText = `Please Select a Person`;
    error.style.color = "red";
    error.style.fontSize = "13px";
    document.querySelector("section").append(error);
  }

  const shoutOut = `${event.target.shoutout.value}`;

  if (shoutOut === "") {
    const error2 = document.createElement("p");
    error2.classList.add("err2");
    error2.innerText = `Please add a shoutout for ${select.value}`;
    error2.style.color = "red";
    error2.style.fontSize = "13px";
    document.querySelector("form").append(error2);
  }
});

const list = document.createElement("li");
const resetBtn = document.createElement("button");
resetBtn.setAttribute("id", "reset-shoutouts");
resetBtn.type = "submit";
resetBtn.innerText = `Remove Shoutouts`;
document.querySelector(".section").append(resetBtn);
ul.append(list);

resetBtn.addEventListener("click", (event) => {
  // const list = document.createElement("li");
  list.remove();
});
