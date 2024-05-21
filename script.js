document.addEventListener("DOMContentLoaded", function() {
    let bikes = [];
    const bikeList = document.getElementById('bike-list');
    
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            bikes = data.bikes;
            displayBikes(bikes);
        })
        .catch(error => console.error('Erreur:', error));

    function displayBikes(bikeArray) {
        bikeList.innerHTML = '';
        bikeArray.forEach(bike => {
            const bikeElement = document.createElement('div');
            bikeElement.classList.add('bike');

            bikeElement.innerHTML = `
                <img src="${bike.image}" alt="${bike.name}">
                <h2>${bike.name}</h2>
                <p>${bike.description}</p>
                <p>Prix: ${bike.price} €/jour</p>
                <a href="reservation.html?bike=${bike.name}" class="reserve-button">Réserver</a>
            `;

            bikeList.appendChild(bikeElement);
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
