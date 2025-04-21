document.addEventListener('DOMContentLoaded', function() {
    const eventsList = document.getElementById('eventsList');
    const addEventBtn = document.getElementById('addEventBtn');


    function loadEvents() {
        eventsList.innerHTML = '';
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${event.title}</h3>
                <p>Дата: ${event.date}</p>
                <p>Категория: ${event.category}</p>
                <button onclick="editEvent(${event.id})">Редактировать</button>
                <button onclick="deleteEvent(${event.id})">Удалить</button>
            `;
            eventsList.appendChild(card);
        });
    }


    addEventBtn.addEventListener('click', function() {
        window.location.href = 'add-event.html';
    });

    window.editEvent = function(eventId) {
        window.location.href = `edit-event.html?id=${eventId}`;
    }

    window.deleteEvent = function(eventId) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events = events.filter(event => event.id !== eventId);
        localStorage.setItem('events', JSON.stringify(events));
        loadEvents();
    }

    loadEvents();
});


document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');

    if (eventForm) {
        eventForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const date = document.getElementById('date').value;
            const category = document.getElementById('category').value;
            const description = document.getElementById('description').value;

            const newEvent = {
                id: Date.now(),
                title,
                date,
                category,
                description
            };

            let events = JSON.parse(localStorage.getItem('events')) || [];
            events.push(newEvent);
            localStorage.setItem('events', JSON.stringify(events));
            window.location.href = 'main.html';
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const eventId = new URLSearchParams(window.location.search).get('id');
    const eventForm = document.getElementById('eventForm');

    if (eventForm) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        const currentEvent = events.find(event => event.id == eventId);

        if (currentEvent) {
            document.getElementById('eventId').value = currentEvent.id;
            document.getElementById('title').value = currentEvent.title;
            document.getElementById('date').value = currentEvent.date;
            document.getElementById('category').value = currentEvent.category;
            document.getElementById('description').value = currentEvent.description;

            eventForm.addEventListener('submit', function(event) {
                event.preventDefault();
                currentEvent.title = document.getElementById('title').value;
                currentEvent.date = document.getElementById('date').value;
                currentEvent.category = document.getElementById('category').value;
                currentEvent.description = document.getElementById('description').value;

                localStorage.setItem('events', JSON.stringify(events));
                window.location.href = 'main.html';
            });
        }
    }
});