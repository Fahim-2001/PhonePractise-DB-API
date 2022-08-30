const loadPhones = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";

  // Show All Functionality
  const showAll = document.getElementById("show-all-btn");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //Send message if no phone found
  const noPhoneMessage = document.getElementById("no-phone-found");
  if (phones.length === 0) {
    noPhoneMessage.classList.remove("d-none");
  } else {
    noPhoneMessage.classList.add("d-none");
  }

  phones.forEach((phone) => {
    // console.log(phone.phone_name);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                  </p>
                  <buttton id="phone-details-btn" onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#phoneDetailsModal">Show Details</button>
                </div>
            </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });

  //   Stop spinner
  loader(false);
};

//Search Proccessor
const searchProccessor = (dataLimit) => {
  // Start Spinner
  loader(true);
  const searchField = document.getElementById("search-phone-field");
  const searchPhone = searchField.value;
  loadPhones(searchPhone, dataLimit);
};

//Search
document.getElementById("phone-search").addEventListener("click", function () {
  searchProccessor(10);
});

//Search Field Enter Key Functionality
document
  .getElementById("search-phone-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProccessor(10);
    }
  });

// phone details
const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  detailsOfPhone(data.data);
};

const detailsOfPhone = (phone) => {
  console.log(phone);
  const modalTitle = document.getElementById("modalTitle");
  modalTitle.innerText = phone.name;
  const phonedetails = document.getElementById("modalDetails");
  phonedetails.innerHTML = `
      <img src="${phone.image}"></img>
      <p>Chipset : ${phone.mainFeatures.chipSet} </p>
      <p>Display : ${phone.mainFeatures.displaySize}</p>
      <p>Memory variants :  ${phone.mainFeatures.memory}</p>
      <p>Release Date : ${
        phone.releaseDate ? phone.releaseDate : "No Release Date Found"
      } </p>
      `;
};

//Button Show All Functionality (not the best way)

document.getElementById("btn-shaw-all").addEventListener("click", function () {
  searchProccessor();
});

//Spinner
const loader = (isLoading) => {
  const spinner = document.getElementById("loader");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// loadPhones();
