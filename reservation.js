document.addEventListener("DOMContentLoaded", function() {
    let bikes = [];
    const reservationList = document.getElementById('reservation-list');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            bikes = data.bikes;
            displayBikes(bikes);
        })
        .catch(error => console.error('Erreur:', error));

    function displayBikes(bikeArray) {
        reservationList.innerHTML = '';
        bikeArray.forEach(bike => {
            const bikeElement = document.createElement('div');
            bikeElement.classList.add('bike');

            bikeElement.innerHTML = `
                <img src="${bike.image}" alt="${bike.name}">
                <h2>${bike.name}</h2>
                <p>${bike.description}</p>
                <p>Prix: ${bike.price} €/jour</p>
                <form class="reservation-form">
                    <label for="name-${bike.name}">Nom :</label>
                    <input type="text" id="name-${bike.name}" name="name" required>
                    <label for="email-${bike.name}">Email :</label>
                    <input type="email" id="email-${bike.name}" name="email" required>
                    <label for="date-${bike.name}">Date :</label>
                    <input type="date" id="date-${bike.name}" name="date" required>
                    <button type="submit">Réserver</button>
                </form>
            `;

            bikeElement.querySelector('.reservation-form').addEventListener('submit', function(event) {
                event.preventDefault();
                const formData = new FormData(event.target);
                const reservationDetails = {
                    bike: bike.name,
                    name: formData.get('name'),
                    email: formData.get('email'),
                    date: formData.get('date')
                };
                console.log('Réservation:', reservationDetails);
                alert(`Réservation confirmée pour le ${bike.name} le ${reservationDetails.date}`);
            });

            reservationList.appendChild(bikeElement);
        });
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            if (category === 'all') {
                displayBikes(bikes);
            } else {
                const filteredBikes = bikes.filter(bike => bike.category === category);
                displayBikes(filteredBikes);
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const data = {
        "ville": [
            {"name": "Vélo de ville 1", "image": "images/velo_ville.jpg"},
            {"name": "Vélo de ville 2", "image": "images/velo_ville.jpg"}
        ],
        "vtt": [
            {"name": "VTT 1", "image": "images/vtt.jpg"},
            {"name": "VTT 2", "image": "images/vtt.jpg"}
        ],
        "course": [
            {"name": "Vélo de course 1", "image": "images/velo_course.jpg"},
            {"name": "Vélo de course 2", "image": "images/velo_course.jpg"}
        ]
    };

    const categories = ["ville", "vtt", "course"];
    categories.forEach(category => {
        const ul = document.getElementById(category);
        data[category].forEach(bike => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${bike.image}" alt="${bike.name}"><p>${bike.name}</p><button>Réserver</button>`;
            ul.appendChild(li);
        });
    });
});
