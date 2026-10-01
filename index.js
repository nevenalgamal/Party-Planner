// === state ====
let parties = [];
let selectedParty;

// ==== constants ====
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2608";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// update state

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}
function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = ` <a href="#selected"> ${party.name}</a>`;
  $li.addEventListener("click", () => {
    getParty(party.id);
  });
  return $li;
}
async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}
function PartyList() {
  const $ul = document.createElement("ul");
  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);
  return $ul;
}

// gurd case initial state
function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }
  const $section = document.createElement("section");
  $section.innerHTML = `<h2>${selectedParty.name}</h2>  
      <P>${selectedParty.id}</p>
      <p>${selectedParty.date}</p>
      <P>${selectedParty.location}</p>
      <p>${selectedParty.description}</p>
     `;
  return $section;
}
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1> Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}
getParties();
