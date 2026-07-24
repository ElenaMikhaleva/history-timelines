const file = document.body.dataset.timeline;

fetch(file)                                             // load the JSON
    .then(response => response.json())                  // wait for the file and convert JSON
    .then(items => {                                     // receive the eons array
        const timelineList = document.getElementById("timeline-list");
        items.forEach(item => {                           // loop through the array.
            const card = document.createElement("div"); // creates <div></div>
            card.className = "period";                  // becomes <div class="period"></div>
            const cardId = item.name.toLowerCase().replace(/\s+/g, '-');
            card.id = cardId;
            card.innerHTML = `
                <div class="period-text">
                    ${item.tags ? `
                        <div class="tags-row">
                            ${item.tags.map(tag => `<a href="${tag.url}" class="tag-pill">${tag.name}</a>`).join('')}
                        </div>
                    ` : ""}
                    <h2>
                        <i class="ph ph-hourglass icon" style="color: ${item.color}"></i>
                        ${item.name} ${item.type ? item.type : ""}
                    </h2>
                    <p>${item.start}–${item.end} million years ago</p>
                    <ul>${item.description.map(point => `<li>${point}</li>`).join("")}</ul>
                    ${item.children && item.children.length > 0 ? `
                        <div class="children-row">
                            <span class="children-label">Subdivisions:</span>
                            <span class="children-text">
                                ${item.children.map(child => `<a href="${child.url}" class="child-link">${child.name}</a>`).join(", ")}
                            </span>
                        </div>
                    ` : ""}
                </div>
                <div class="image-wrapper" style="--period-color: ${item.color}">
                    <img src="${item.image}" class="card-image">
                </div>
            `;
            timelineList.appendChild(card); // add it to the page
            if (window.location.hash) {
            // Find the card that matches the hashtag (e.g., #proterozoic)
            const targetCard = document.querySelector(window.location.hash);

            // If the card exists, scroll smoothly to it
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth' });
            }
        }
        });
    });