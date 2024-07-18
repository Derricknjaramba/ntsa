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



document.addEventListener('DOMContentLoaded', function() {
  const apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/merc?format=json';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Optional: Log the API response to inspect data structure

      // Extract vehicle types array
      const vehicleTypes = data.Results;

      // Map through the vehicleTypes array and transform data
      const transformedData = vehicleTypes.map(vehicle => ({
        typeName: vehicle.VehicleTypeName,
        imageUrl: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80', // Placeholder image URL (replace with actual image if available)
      }));

      // Optional: Log transformed data to verify
      console.log(transformedData);

      // Display transformed data on the webpage
      const vehicleTypesContainer = document.getElementById('vehicleTypes');

      transformedData.forEach(vehicle => {
        const vehicleDiv = document.createElement('div');
        vehicleDiv.classList.add('vehicle-type');

        const vehicleImage = document.createElement('img');
        vehicleImage.src = vehicle.imageUrl;
        vehicleImage.alt = vehicle.typeName;

        vehicleDiv.appendChild(vehicleImage);

        const vehicleName = document.createElement('p');
        vehicleName.textContent = vehicle.typeName;

        vehicleDiv.appendChild(vehicleName);

        vehicleTypesContainer.appendChild(vehicleDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});