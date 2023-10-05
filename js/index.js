import {
  addItemToPage,
  clearInputs,
  getInputValues,
  renderItemsList,
  editItem,
} from "./dom_util.js";


const submitButton = document.getElementById("submit_button");
const findButton = document.getElementById("find_button");
const cancelFindButton = document.getElementById("cancel_find_button");
const findInput = document.getElementById("find_input");
const sortTrolleybuses = document.getElementById("sort_button")
const calculateButton = document.getElementById("calculate_button");
const summaryCapacity = document.getElementById("summary_capacity");

let trolleybuses = [];
let addedTrolleybusNumbers = [];
const addItem = ({trolleybus_number, route_number, capacity, max_speed}) => {
  if (addedTrolleybusNumbers.includes(trolleybus_number)) {
    alert(`Trolleybus with number ${trolleybus_number} already exists.`);
    return; // Do not add if it's not unique
  }
  const generatedId = uuid.v1();

  const newItem = {
    id: generatedId,
		trolleybus_number, 
		route_number, 
		capacity, 
		max_speed,
  };

  trolleybuses.push(newItem);
  addedTrolleybusNumbers.push(trolleybus_number);

  addItemToPage(newItem);
}



submitButton.addEventListener("click", (event) => {
  // Prevents default page reload on submit
  event.preventDefault();

  const { trolleybus_number, route_number, capacity, max_speed } = getInputValues();

  clearInputs();

  addItem({
    trolleybus_number, 
		route_number, 
		capacity, 
		max_speed,
  });
});

findButton.addEventListener("click", () => {
  const foundTrolleybuses = trolleybuses.filter(
    (trolleybus) => trolleybus.route_number.search(findInput.value) !== -1
  );

  renderItemsList(foundTrolleybuses)
});

cancelFindButton.addEventListener("click", () => {
  renderItemsList(trolleybuses);

  findInput.value = "";
});

sortTrolleybuses.addEventListener("click", ()=>{
  trolleybuses.sort((first, second) => {
    return second.max_speed.localeCompare(first.max_speed);
  });

  
  renderItemsList(trolleybuses);
});

calculateButton.addEventListener("click", () => {

  const totalCapacity = trolleybuses.reduce((total, trolleybus) => Number(total) + Number(trolleybus.capacity), 0);
  summaryCapacity.textContent = `Summary capacity: ${totalCapacity} people`;
});

function handleEditButtonClick(itemId) {
  // Find the index of the item to be edited in your trolleybuses array
  const index = trolleybuses.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    // Populate the edit form with the item's data
    populateEditForm(index);

    const editForm = document.getElementById('edit_form');
    editForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get the edited trolleybus data
      const editedTrolleybus = {
        route_number: document.getElementById('edit_route_number_input').value,
        trolleybus_number: document.getElementById('edit_trolleybus_number_input').value,
        capacity: document.getElementById('edit_capacity_input').value,
        max_speed: document.getElementById('edit_max_speed_input').value,
      };

      // Update the trolleybus data in the array
      trolleybuses[index] = editedTrolleybus;

      // Clear the edit form
      editForm.reset();

      // Update the item's data on the page
      editItem(itemId, editedTrolleybus);

      alert('Trolleybus edited successfully.');

      renderItemsList(trolleybuses);
    });
  }
}


renderItemsList(trolleybuses);