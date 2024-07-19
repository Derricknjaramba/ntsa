const home = document.getElementById('home');
home.addEventListener('click',e=>{
  home.textContent="Visit us here"
})

const element = document.getElementById('mton');

// Add mouseover event listener
element.addEventListener('mouseover', function() {
    element.style.backgroundColor = 'lightcoral';
});

// Add mouseout event listener
element.addEventListener('mouseout', function() {
    element.style.backgroundColor = 'lightblue';
});



fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json')
.then(response => response.json())
.then(data => {
  // Process the JSON data
  const carListDiv = document.getElementById('carList');
  data.cars.forEach(car => {
    const carElement = document.createElement('div');
    carElement.innerHTML = `
      <h2>${car.make} ${car.model}</h2>
      <p><strong>Year:</strong> ${car.year}</p>
      <p><strong>Color:</strong> ${car.color}</p>
      <p><strong>Price:</strong> $${car.price}</p>
      <hr>
    `;
    carListDiv.appendChild(carElement);
  });
})
.catch(error => {
  console.error('Error fetching data:', error);
});
function searchVehicleTypes(event) {
  event.preventDefault(); // Prevent form submission
  const make = document.getElementById('makeInput').value.trim();

  if (!make) {
    alert('Please enter a make.');
    return;
  }

  const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}?format=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayResults(data.Results, make);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      alert('Failed to fetch vehicle types. Check console for details.');
    });
}

function displayResults(results, make) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p>No vehicle types found for ${make}.</p>`;
    return;
  }

  const list = document.createElement('ul');
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.textContent = result.VehicleTypeName;
    list.appendChild(listItem);
  });

  resultsContainer.appendChild(list);
}