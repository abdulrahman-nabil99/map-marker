"use strict";

class Facility {
  id = `${Date.now()}`;
  // prettier-ignore
  constructor(coord,address,email,phoneNumber,description,worktime,name,review,rate) {
    this.coord = coord;
    this.address = address;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.description = description;
    this.worktime = worktime;
    this.name = name;
    this.review = review;
    this.rate = rate;
  }
}
class Collage extends Facility {
  type = "collage";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
  }
}

class School extends Facility {
  type = "school";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
  }
}

class Hotel extends Facility {
  type = "hotel";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
    }
}

class Hospital extends Facility {
  type = "hospital";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
    }
}

class Resturant extends Facility {
  type = "resturant";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
    }
}

class Store extends Facility {
  type = "store";
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
    }
}

class Other extends Facility {
  category = "other";
  type;
  // prettier-ignore
  constructor(coord, address, email, phoneNumber, description, worktime,name,review,rate,type) {
    super(coord, address, email, phoneNumber, description, worktime,name,review,rate);
      this.type = type
    }
}

class App {
  form = document.querySelector(".form-container");
  formElement = document.querySelector(".form-container form");
  side = document.getElementById("side");
  typeBox = document.getElementById("type-box");
  typeSelect = document.getElementById("types-options");
  typeInput = document.getElementById("type");
  nameInput = document.getElementById("name");
  addressInput = document.getElementById("address");
  phoneNumberInput = document.getElementById("phoneNumber");
  emailInput = document.getElementById("email");
  worktimeInput = document.getElementById("worktime");
  descriptionInput = document.getElementById("description");
  reviewInput = document.getElementById("review");
  rateInput = document.getElementById("rate");
  // edit form
  typeBoxEdit = document.getElementById("edit-type-box");
  typeSelectEdit = document.getElementById("edit-types-options");
  typeInputEdit = document.getElementById("edit-type");
  nameInputEdit = document.getElementById("edit-name");
  addressInputEdit = document.getElementById("edit-address");
  phoneNumberInputEdit = document.getElementById("edit-phoneNumber");
  emailInputEdit = document.getElementById("edit-email");
  worktimeInputEdit = document.getElementById("edit-worktime");
  descriptionInputEdit = document.getElementById("edit-description");
  reviewInputEdit = document.getElementById("edit-review");
  rateInputEdit = document.getElementById("edit-rate");
  //
  closeBtn = document.getElementById("closeBtn");
  closeListBtn = document.getElementById("closeListBtn");
  closeEditBtn = document.getElementById("closeEditBtn");
  navBar = document.getElementById("showListBar");
  showListBtn = document.getElementById("showListBtn");
  resetAppBtn = document.getElementById("resetAppBtn");
  overlay = document.getElementById("overlay");
  editFormContainer = document.getElementById("edit-Screen");
  editForm = document.getElementById("edit-Form");
  warningPop = document.getElementById("check-again");
  confirmBtn = document.getElementById("yesSure");
  declineBtn = document.getElementById("noDont");
  #allfacilities = [];
  #map;
  #mapEvent;
  #zoomLvl = 13;
  #editedFacility;
  #elementToDelete;
  constructor() {
    this.#getPosition();
    this.typeSelect.addEventListener("change", this.#changetype.bind(this));
    this.typeSelectEdit.addEventListener(
      "change",
      this.#changetypeEdited.bind(this)
    );
    this.formElement.addEventListener("submit", this.#newFacility.bind(this));
    this.editForm.addEventListener("submit", this.#editfacility.bind(this));
    this.closeBtn.addEventListener("click", this.#hideForm.bind(this));
    this.closeListBtn.addEventListener("click", this.#hideSideList.bind(this));
    this.closeEditBtn.addEventListener("click", this.#hideEditForm.bind(this));
    this.resetAppBtn.addEventListener("click", this.#resetApp.bind(this));
    this.showListBtn.addEventListener("click", this.#showSideList.bind(this));
    this.side.addEventListener("click", this.#moveToLocation.bind(this));
    this.declineBtn.addEventListener("click", this.#hideWarning.bind(this));
    this.confirmBtn.addEventListener(
      "click",
      this.#completeDeleting.bind(this)
    );
    this.#getLocalStorage();
  }
  #getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.#loadMap.bind(this),
        function () {
          alert(`Could't get your position`);
        }
      );
  }
  #loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, this.#zoomLvl);
    L.tileLayer("https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    this.#map.on("click", this.#displayForm.bind(this));
    this.#allfacilities.forEach((fac) => {
      this.#renderMarkOnMap(fac);
    });
  }
  #displayForm(e) {
    this.#mapEvent = e;
    this.form.classList.remove("hidden");
    this.nameInput.focus();
    this.#hideSideList();
  }
  #hideForm(e) {
    document.querySelectorAll("input").forEach((el) => {
      el.value = "";
      el.blur();
    });
    this.form.classList.add("hidden");
  }
  #changetype() {
    if (this.typeSelect.value === "other") {
      this.typeBox.classList.remove("type-box-hidden");
    } else {
      this.typeBox.classList.add("type-box-hidden");
    }
  }
  #changetypeEdited() {
    if (this.typeSelectEdit.value === "other") {
      this.typeBoxEdit.classList.remove("type-box-hidden");
    } else {
      this.typeBoxEdit.classList.add("type-box-hidden");
    }
  }
  #newFacility(e) {
    e.preventDefault();
    // get all inputs
    let facility;
    let newType;
    // get Data
    let { lat, lng } = this.#mapEvent.latlng;
    let name = this.nameInput.value.trim();
    let address = this.addressInput.value.trim();
    let phoneNumb = this.phoneNumberInput.value;
    let email = this.emailInput.value.trim();
    let rate = this.rateInput.value;
    let description = this.descriptionInput.value.trim();
    let type = this.typeSelect.value.trim();
    let review = this.reviewInput.value.trim();
    let worktime = this.worktimeInput.value.trim();
    if (type === "other") {
      newType = this.typeInput.value.trim().toLowerCase();
      if (!newType) return alert("Enter Valid Type");
    }
    // check required data validity
    if (!type) return alert("Enter Valid Type");
    if (!name) return alert("Enter Valid Name");
    if (!address) return alert("Enter Valid Address");
    if (!description) return alert("Enter Valid description");
    // Creat new facility
    if (type === "collage") {
      // prettier-ignore
      facility = new Collage([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "school") {
      // prettier-ignore
      facility = new School([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "hotel") {
      // prettier-ignore
      facility = new Hotel([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "store") {
      // prettier-ignore
      facility = new Store([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "hospital") {
      // prettier-ignore
      facility = new Hospital([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "resturant") {
      // prettier-ignore
      facility = new Resturant([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate)
    }
    if (type === "other") {
      // prettier-ignore
      facility = new Other([lat,lng],address,email,phoneNumb,description,worktime,name,review,rate,newType)
    }
    // add to allfacilties array
    this.#allfacilities.push(facility);
    // add mark for facility
    this.#renderMarkOnMap(facility);
    // add facility to list
    this.#renderMarkOnList(facility);
    // edit local storage
    this.#setLocalStorage();
    // hide form
    this.#hideForm();
  }

  #renderMarkOnMap(facility) {
    let myIcon = L.icon({
      iconUrl: `./imgs/${facility.category ? "other" : facility.type.toLowerCase()}.svg`,
      iconSize: [18, 35],
    });
    L.marker(facility.coord, { icon: myIcon })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
        })
      )
      .setPopupContent(`${facility.name}`);
  }
  #renderMarkOnList(facility) {
    // set Stars according to rate
    let rateStart = "";

    function setStars() {
      for (let i = 1; i <= +facility.rate; i++) {
        rateStart += "⭐";
      }
      return rateStart;
    }
    // create articel Element for facility
    const HTML = `
        <article class="facility-col ${facility.type}-article" data-id="${
      facility.id
    }">
          <h3 class="title-facility">
          <span id="icon"><img src="./imgs/${facility.category ? "other" : facility.type.toLowerCase()}.svg" alt=""></span>
            ${facility.name}
          </h3>
          <p class="description-facility">
          ${facility.description}
          </p>
          <p class="address-facility">${facility.address}</p>
          <p class="phnumber-facility">${
            facility.phoneNumber ? facility.phoneNumber : ""
          }</p>
          <p class="email-facility">${facility.email ? facility.email : ""}</p>
          <p class="review-facility">${
            facility.review ? facility.review : ""
          }</p>
          <p class="rate-facility">${setStars()}</p>
          <p class="worktime-facility">${
            facility.worktime ? facility.worktime : ""
          }</p>
          <button class='edit-Btn'>Edit</button>
          <button class='delete-Btn'>Delete</button>
        </article>
    `;
    // inserting element
    this.side.insertAdjacentHTML("afterbegin", HTML);
  }
  #moveToLocation(e) {
    if (e.target.classList.contains("edit-Btn"))
      return this.#showEditForm(e.target);
    if (e.target.classList.contains("delete-Btn"))
      return this.#deletefacility(e.target);

    let facilityEl = e.target.closest(".facility-col");
    if (!facilityEl) return;
    // prettier-ignore
    const facility = this.#allfacilities.find((fa) => fa.id === facilityEl.getAttribute("data-id"));
    this.#map.setView(facility.coord, 17, {
      animate: true,
      pan: { duration: 1 },
    });
  }
  #showSideList() {
    this.side.classList.remove("side-hidden");
    this.navBar.classList.add("side-hidden");
  }
  #hideSideList() {
    this.side.classList.add("side-hidden");
    this.navBar.classList.remove("side-hidden");
  }
  #showEditForm(e) {
    this.editFormContainer.style.display = "flex";
    this.overlay.style.display = "block";
    const facility = this.#allfacilities.find(
      (fac) => fac.id === e.closest(".facility-col").getAttribute("data-id")
    );
    // set old data to inputs
    this.nameInputEdit.value = facility.name;
    this.addressInputEdit.value = facility.address;
    this.phoneNumberInputEdit.value = facility.phoneNumber;
    this.emailInputEdit.value = facility.email;
    this.rateInputEdit.value = facility.rate;
    this.descriptionInputEdit.value = facility.description;
    this.reviewInputEdit.value = facility.review;
    this.worktimeInputEdit.value = facility.worktime;
    if (facility.category === "other") {
      this.typeSelectEdit.value = "other";
      this.typeInputEdit.value = facility.type;
    } else {
      this.typeSelectEdit.value = facility.type;
    }
    this.#editedFacility = facility;
  }
  #editfacility(e) {
    e.preventDefault();
    // some Checks
    if (!this.nameInputEdit.value) return alert("Invalid Name");
    if (!this.addressInputEdit.value) return alert("Invalid Address");
    if (!this.descriptionInputEdit.value) return alert("Invalid Description");
    if (!this.typeSelectEdit.value) return alert("Invalid Type");
    // change to new  Data
    this.#editedFacility.name = this.nameInputEdit.value;
    this.#editedFacility.address = this.addressInputEdit.value;
    this.#editedFacility.phoneNumber = this.phoneNumberInputEdit.value;
    this.#editedFacility.email = this.emailInputEdit.value;
    this.#editedFacility.rate = this.rateInputEdit.value;
    this.#editedFacility.description = this.descriptionInputEdit.value;
    this.#editedFacility.review = this.reviewInputEdit.value;
    this.#editedFacility.worktime = this.worktimeInputEdit.value;
    // convert form other
    if (this.#editedFacility.category === "other") {
      // to known one
      if (
        this.typeSelectEdit.value == "collage" ||
        this.typeSelectEdit.value === "school" ||
        this.typeSelectEdit.value === "hospital" ||
        this.typeSelectEdit.value === "resturant" ||
        this.typeSelectEdit.value === "hotel" ||
        this.typeSelectEdit.value === "store"
      ) {
        this.#editedFacility.type = this.typeSelectEdit.value;
        delete this.#editedFacility.category;
      } else {
        // to other
        if (!this.typeInputEdit.value) return alert("Invalid Type");
        this.#editedFacility.type = this.typeInputEdit.value;
      }
      // convert from known one to other
    } else if (this.typeSelectEdit.value === "other") {
      if (!this.typeInputEdit.value) return alert("Invalid Type");
      this.#editedFacility.category = "other";
      this.#editedFacility.type = this.typeInputEdit.value;
      // convert known to known
    } else {
      this.#editedFacility.type = this.typeSelectEdit.value;
    }
    this.#setLocalStorage();
    location.reload();
    this.#hideForm();
    this.#hideEditForm();
  }
  #hideEditForm() {
    this.editFormContainer.style.display = "none";
    this.overlay.style.display = "none";
  }
  #deletefacility(e) {
    console.log("delete");
    const facility = this.#allfacilities.find(
      (fac) => fac.id === e.closest(".facility-col").getAttribute("data-id")
    );
    this.#elementToDelete = facility;
    this.#displayWarning();
  }
  #displayWarning() {
    this.warningPop.style.display = "flex";
    this.overlay.style.display = "block";
  }
  #hideWarning() {
    this.warningPop.style.display = "none";
    this.overlay.style.display = "none";
    this.#elementToDelete = null;
  }
  #completeDeleting() {
    this.#allfacilities.splice(
      this.#allfacilities.indexOf(this.#elementToDelete),
      1
    );
    this.#elementToDelete = null;
    this.#setLocalStorage();
    location.reload();
  }
  #setLocalStorage() {
    localStorage.facilities = JSON.stringify(this.#allfacilities);
  }
  #getLocalStorage() {
    if (!localStorage.facilities) return;
    this.#allfacilities = JSON.parse(localStorage.facilities);
    this.#allfacilities.forEach((fac) => {
      this.#renderMarkOnList(fac);
    });
  }
  #resetApp() {
    localStorage.removeItem("facilities");
    location.reload();
  }
}
const app = new App();
