// Inputs
const fstName = document.querySelector("#fname");
const lstName = document.querySelector("#lname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const motif = document.querySelector("#motif");
const date = document.querySelector("#date");

// Buttons
const addBtn = document.querySelector(".add-btn");
const displayDemandesBtn = document.querySelector(".display-demandes");
const addDemandeBtn = document.querySelector(".add-demande");
const deleteBtn = document.querySelector(".delete-btn");

// table infos
const infosTable = document.querySelector(".infos-table tbody");
const infos = document.querySelector(".infos");

const form = document.querySelector(".form");

let demandes = [];

function addDemande(e) {
  e.preventDefault();

  if (
    !fstName.value ||
    !lstName.value ||
    !phone.value ||
    !email.value ||
    !motif.value ||
    !date.value
  )
    return;

  const demande = {
    id: crypto.randomUUID(),
    firstName: fstName.value,
    lastName: lstName.value,
    phone: phone.value,
    email: email.value,
    motif: motif.value,
    date: date.value,
  };

  demandes.push(demande);
  clearInputs();
}

// display Demandes
function displayDemandes() {
  console.log(demandes);
  infosTable.innerHTML = "";

  //   if (!demandes.length) {
  //     return (infos.innerHTML = `<h1>No Demandes Yet.</h1>`);
  //   }

  demandes.forEach((demande) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${demande.lastName}</td>
      <td>${demande.firstName}</td>
      <td>${demande.date}</td>
      <td>${demande.phone}</td>
      <td>${demande.email}</td>
      <td>${demande.motif}</td>
      <td>
      <span class="edit-btn" style="cursor: pointer; margin-right: 10px">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
        />
      </svg>
    </span>
     <span  class="delete-btn" style="cursor: pointer; display: inline-block; width: 20px; height: 20px;" onclick="deleteDemande('${demande.id}')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    </span>
      </td>
    `;

    infosTable.appendChild(row);
  });

  //   form.classList.add("hide");
  //   infos.classList.remove("hide");

  //   displayDemandesBtn.classList.add("hide");
  //   addDemandeBtn.classList.remove("hide");
}

// delete demande
function deleteDemande(id) {
  demandes = demandes.filter((demande) => demande.id !== id);

  displayDemandes();
}

// clear inputs
function clearInputs() {
  fstName.value = "";
  lstName.value = "";
  phone.value = "";
  email.value = "";
  motif.value = "";
  date.value = "";
}

addBtn.addEventListener("click", (e) => addDemande(e));

displayDemandesBtn.addEventListener("click", () => {
  displayDemandes();

  displayDemandesBtn.classList.add("hide");
  addDemandeBtn.classList.remove("hide");

  form.classList.add("hide");
  infos.classList.remove("hide");
});

addDemandeBtn.addEventListener("click", () => {
  displayDemandesBtn.classList.remove("hide");
  addDemandeBtn.classList.add("hide");

  form.classList.remove("hide");
  infos.classList.add("hide");
});
