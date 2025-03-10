const cities = [
    {
        "id": 1,
        "city": "New York",
        "price": 5000,
        "desc": "New York is a state in the northeastern U.S., known for New York City and towering Niagara Falls. NYC’s island of Manhattan is home to the Empire State Building, Times Square and Central Park. The Brooklyn Bridge connects Manhattan with the borough of Brooklyn. The iconic Statue of Liberty stands in New York Harbor. To the east, Long Island has beaches, the Montauk Lighthouse, the ritzy Hamptons and Fire Island.",
        "img": "https://www.planetware.com/photos-large/USNY/new-york-city-statue-of-liberty.jpg",
        "hotels": [
            { "id": 1, "name": "Hotel 1", "price": 1000 },
            { "id": 2, "name": "Hotel 2", "price": 2000 },
            { "id": 3, "name": "Hotel 3", "price": 3000 }
        ]
    },
    {
        "id": 2,
        "city": "Los Angeles",
        "price": 4000,
        "desc": "Los Angeles is a sprawling Southern California city and the center of the nation’s film and television industry. Near its iconic Hollywood sign, studios such as Paramount Pictures, Universal and Warner Brothers offer behind-the-scenes tours. On Hollywood Boulevard, TCL Chinese Theatre displays celebrities’ hand- and footprints, the Walk of Fame honors thousands of luminaries and vendors sell maps to stars’ homes.",
        "img": "https://www.planetware.com/photos-large/USCA/california-los-angeles-hollywood-walk-of-fame-and-street.jpg",
        "hotels": [
            { "id": 1, "name": "Hotel 1", "price": 1000 },
            { "id": 2, "name": "Hotel 2", "price": 2000 },
            { "id": 3, "name": "Hotel 3", "price": 3000 }
        ]
    },
    {
        "id": 3,
        "city": "Chicago",
        "price": 3000,
        "desc": "Chicago, on Lake Michigan in Illinois, is among the largest cities in the U.S. Famed for its bold architecture, it has a skyline punctuated by skyscrapers such as the iconic John Hancock Center, 1,451-ft. Willis Tower (formerly the Sears Tower) and the neo-Gothic Tribune Tower. The city is also renowned for its museums, including the Art Institute of Chicago with its noted Impressionist and Post-Impressionist works.",
        "img": "https://www.planetware.com/photos-large/USIL/illinois-chicago-millenium-park.jpg",
        "hotels": [
            { "id": 1, "name": "Hotel 1", "price": 1000 },
            { "id": 2, "name": "Hotel 2", "price": 2000 },
            { "id": 3, "name": "Hotel 3", "price": 3000 }
        ]
    }
];

localStorage.setItem('cities', JSON.stringify(cities));

let basePrice = 0;
let hotelPrice = 0;
let cityName = "";

function loadCityDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const cityId = parseInt(urlParams.get('id')); 
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    const city = cities.find(c => c.id === cityId);

    if (city) {
        document.getElementById("city-name").textContent = city.city;
        document.getElementById("city-desc").textContent = city.desc;
        document.getElementById("city-price").textContent = `Precio Base:$${city.price}`;

        const hotelSelect = document.getElementById("hotel-select");
        hotelSelect.innerHTML = "<option value=''>--Elige un hotel--</option>"; 

        city.hotels.forEach(hotel => {
            const option = document.createElement("option");
            option.value = hotel.id;
            option.textContent = `${hotel.name} - ${hotel.price}`;
            hotelSelect.appendChild(option);
        });

        basePrice = city.price;
        cityName = city.city;

        calcularTotal();
    } else {
        console.error("Ciudad no encontrada");
    }
}

function selectHotel() {
    const hotelSelected = document.getElementById("hotel-select");
    const selectHotelId = hotelSelected.value;

    if (selectHotelId) {
        const cities = JSON.parse(localStorage.getItem('cities')) || [];
        const city = cities.find(c => c.city === cityName); 
        const selectedHotel = city.hotels.find(h => h.id === parseInt(selectHotelId));

        hotelPrice = selectedHotel.price; 
        localStorage.setItem('selectedHotel', selectedHotel.name); 

        calcularTotal();
    } else {
        hotelPrice = 0;
        calcularTotal();
    }
}

function calcularTotal() {
    const personas = parseInt(document.getElementById("num-peoples").value, 10);
    const noches = parseInt(document.getElementById("num-nights").value, 10);

    if (isNaN(personas) || personas <= 0) {
        alert("Por favor ingrese un número válido de personas.");
        return;
    }

    if (isNaN(noches) || noches <= 0) {
        alert("Por favor ingrese un número válido de noches.");
        return;
    }

    const total = (basePrice + hotelPrice) * personas * noches;
    document.getElementById("total-price").textContent = `${total}`;
}

function GuardarDatos() {
    const personas = document.getElementById("num-peoples").value;
    const noches = document.getElementById("num-nights").value;
    const total = document.getElementById("total-price").textContent;
    const selectedHotel = localStorage.getItem('selectedHotel');
    
    const selectedCity = {
        city: cityName,
        hotel: selectedHotel,
        totalPrice: total,
        numPersonas: personas,
        numNoches: noches,
    };

    localStorage.setItem('selectedCityDetails', JSON.stringify(selectedCity));
    
    window.location.href = 'resumen.html'; 
}

function loadResumenDatos() {
    const selectedCityDetails = JSON.parse(localStorage.getItem('selectedCityDetails'));

    if (selectedCityDetails) {
        document.getElementById("selected-city").textContent = selectedCityDetails.city || "No seleccionado";
        document.getElementById("selected-hotel").textContent = selectedCityDetails.hotel || "No seleccionado";
        document.getElementById("final-total").textContent = `$${selectedCityDetails.totalPrice}` || "$0";
    } else {
        document.getElementById("final-total").textContent = `$${parseFloat(selectedCityDetails.totalPrice) || 0}`;
document.getElementById("selected-personas").textContent = selectedCityDetails.numPersonas || "No especificado";
document.getElementById("selected-noches").textContent = selectedCityDetails.numNoches || "No especificado";
    }
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    if (name && surname && email && phone) {
        alert("Tu viaje fue reservado, gracias por elegirnos :)");
        localStorage.clear();
        window.location.href = 'index.html'; 
    } else {
        alert("Por favor completa todos los campos");
    }
}

if (window.location.pathname.includes("detalles.html")) {
    loadCityDetails();
}

if (window.location.pathname.includes("resumen.html")) {
    loadResumenDatos();
}
