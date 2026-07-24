    fetch("../data/eons.json")                              // load the JSON
        .then(response => response.json())                  // wait for the file and convert JSON
        .then(eons => {                                     // receive the eons array
            const timelineList = document.getElementById("timeline-list");
            eons.forEach(eon => {                           // loop through the array.
                const card = document.createElement("div"); // creates <div></div>
                card.className = "period";                  // becomes <div class="period"></div>
                card.innerHTML = `
                    <h2>${eon.name}</h2>
                    <p>${eon.start}–${eon.end} million years ago</p>
                    <p>${eon.description}</p>
                `;
                timelineList.appendChild(card); // add it to the page
            });
        });