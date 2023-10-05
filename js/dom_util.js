const trolleybusNumberInput = document.getElementById("trolleybus_number_input");
const routeNumberInput = document.getElementById("route_number_input");
const capacityInput = document.getElementById("capacity_input");
const maxSpeedInput = document.getElementById("max_speed_input");

const itemsContainer = document.getElementById("trolleybus_container");

// local functions
const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, trolleybus_number, route_number, capacity, max_speed }) => `
<li id="${id}" class="card mb-3 item-card" draggable="true">
  <img
    src="https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/3/1/28031_ualvivelectrontrolleybuses_422333.jpg"
    class="item-container__image card-img-top" alt="card">
  <div class="card-body">
    <h5 class="card-title">${route_number}</h5>
    <p class="card-text">Trolleybus number: ${trolleybus_number}</p>
    <p class="card-text">Capacity: ${capacity} people</p>
    <p class="card-text">Max speed: ${max_speed} km/h</p>
  </div>
  <button id="edit-button-${id}" class="btn-primary mb-2 ml-5" style="width: 60px;">Edit</button>
</li>`;

// exposed functions
export const clearInputs = () => {
  trolleybusNumberInput.value = "";
  routeNumberInput.value = "";
  capacityInput.value = "";
  maxSpeedInput.value = "";
};

export const addItemToPage = ({ id, trolleybus_number, route_number, capacity, max_speed }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, trolleybus_number, route_number, capacity, max_speed })
  );

  const element = document.getElementById(id);

  // Add an event listener to the "Edit" button for the new item
  const editButton = document.getElementById(`edit-button-${id}`);
  editButton.addEventListener("click", () => handleEditButtonClick(id));
};

export const renderItemsList = (items) =>{
  itemsContainer.innerHTML="";

  for (const item of items){
    addItemToPage(item);
  }
}



export const getInputValues = () => {
  return {
		trolleybus_number: trolleybusNumberInput.value,
		route_number: routeNumberInput.value,
    capacity: capacityInput.value,
		max_speed: maxSpeedInput.value,
  };
};

export const editItem = (id, newData) => {
  const itemElement = document.getElementById(id);
  if (!itemElement) {
    return;
  }

  // Update the item's content with the new data
  const { trolleybus_number, route_number, capacity, max_speed } = newData;
  itemElement.innerHTML = `
    <img
      src="https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1024x536/0/3/1/28031_ualvivelectrontrolleybuses_422333.jpg"
      class="item-container__image card-img-top" alt="card">
    <div class="card-body">
      <h5 class="card-title">${route_number}</h5>
      <p class="card-text">Trolleybus number: ${trolleybus_number}</p>
      <p class="card-text">Capacity: ${capacity} people</p>
      <p class="card-text">Max speed: ${max_speed} km/h</p>
    </div>
    <button id="edit-button-${id}" class="btn-primary mb-2 ml-5" style="width: 60px;">Edit</button>
  `;

  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemElement
  );

  // Add an event listener to the "Edit" button of the edited item
  const editButton = document.getElementById(`edit-button-${id}`);
  editButton.addEventListener("click", () => handleEditButtonClick(id));

  renderItemsList(trolleybusses);
};


