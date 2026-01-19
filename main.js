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
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// table infos
const infosTable = document.querySelector(".infos-table tbody");
const message = document.querySelector(".message");
const infos = document.querySelector(".infos");
const pagination = document.querySelector(".pagination");
const page = document.querySelector(".page");

const form = document.querySelector(".form");

let demandes = [];

let currPage = 1;
const itemsPerPage = 3;

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
  alert("demande ajoute avec succee ✅");
  // clearInputs();
}

// display Demandes
function displayDemandes() {
  console.log(demandes);
  infosTable.innerHTML = "";
  message.textContent = "";

  if (!demandes.length) {
    message.textContent = `Aucune Demande disponible.`;
  }

  const startIndex = (currPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  demandes.slice(startIndex, endIndex).forEach((demande) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${demande.lastName}</td>
      <td>${demande.firstName}</td>
      <td>${demande.date}</td>
      <td>${demande.phone}</td>
      <td>${demande.email}</td>
      <td>${demande.motif}</td>
      <td>
     
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

    pagination.classList.remove("hide");
    updatePagination();
  });
}

function getTotalPages() {
  return Math.ceil(demandes.length / itemsPerPage);
}

function updatePagination() {
  const totalPages = getTotalPages();

  page.textContent = currPage;

  if (currPage === 1) {
    prevBtn.parentElement.classList.add("disabled");
  } else {
    prevBtn.parentElement.classList.remove("disabled");
  }

  if (currPage === totalPages || totalPages === 0) {
    nextBtn.parentElement.classList.add("disabled");
  } else {
    nextBtn.parentElement.classList.remove("disabled");
  }

  if (demandes.length === 0 || totalPages <= 1) {
    pagination.classList.add("hide");
  } else {
    pagination.classList.remove("hide");
  }
}

// delete demande
function deleteDemande(id) {
  demandes = demandes.filter((demande) => demande.id !== id);

  const totalPages = getTotalPages();
  if (currPage > totalPages && totalPages > 0) {
    currPage = totalPages;
    pagination.classList.add("hide");
  }

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

form.addEventListener("submit", (e) => addDemande(e));

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

prevBtn.addEventListener("click", () => {
  if (currPage > 1) {
    currPage--;
    displayDemandes();
  }
});

nextBtn.addEventListener("click", () => {
  const totalPages = getTotalPages();
  if (currPage < totalPages) {
    currPage++;
    displayDemandes();
  }
});
