const filterForm = document.getElementById("filter-form");

filterForm.onchange = handleChange;

function handleChange(e) {
    const tags = [];
    const inputs = filterForm.querySelectorAll("[name='restrictions']");
    inputs.forEach((input) => {
        if (input.checked) {
            tags.push(input.value);
        }
    });

    getEvents(tags)
        .then((res) => {
            console.log("I am here")
            displayEvents(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}

function eventCard(element) {
    let card = `
    <div class="events-info">
        <img class="img_events_all" src="${element.imgPath}" alt="${element.eventName}">
   
    <h3>${element.eventName}</h3>
    <h4 class="events-title">${element.type}</h4>
    <h4>Date:</h4>
    <p>May 03 2020 09:30</p> 
      `;
    
    let list = "<ul>";
    element.restrictions.forEach((element) => {
        list += `<li class="item">${element.restrictions}</li>`;
    });
    card += list + `</ul><p><a href="/event/${element._id}">See more</a></p></div>`;
    return card;
}

function displayEvents(allEvents) {
    const container = document.getElementById("events-wrapper-two");
    container.innerHTML = "";
    allEvents.forEach((element) => {
        container.innerHTML += eventCard(element);
    });
}

function getEvents(tags) {
    return axios.get("/api/allevents", {
        params: {
            // axios.get(url, options)
            tags: tags, // This params option object
        }, // will be sent as a query parameter // query string.
    });
}
