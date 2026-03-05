const timelineWrapper = document.querySelector(".timeline-wrapper");
const timeline = document.querySelector(".timeline");
const geoPeriods = document.querySelectorAll(".eon, .era, .geoPeriod");
const markers = document.querySelectorAll(".marker");

const timelineStart = -4567; // oldest year
const timelineEnd = 0;       // present

// current view
let viewStart = timelineStart;
let viewEnd = timelineEnd;

// calculate pixels per year based on viewport
function pxPerYear() {
    return timelineWrapper.clientWidth / (viewEnd - viewStart);
}

function updatePositions() {
    const ppx = pxPerYear();

    geoPeriods.forEach(geoPeriod => {
        const start = parseInt(geoPeriod.dataset.start);
        const end = parseInt(geoPeriod.dataset.end);
        const left = (start - viewStart) * ppx;
        const width = (end - start) * ppx;

        geoPeriod.style.left = left + "px";
        geoPeriod.style.width = width + "px";

        // --- THE NEW LOGIC: CONDITIONAL TEXT ---
        // Grab the full name from a data attribute or the inner content once
        const fullName = geoPeriod.getAttribute('data-name') || geoPeriod.innerText;
        if (!geoPeriod.getAttribute('data-name')) {
            geoPeriod.setAttribute('data-name', fullName); // Store original name
        }

        // If block is narrower than 45px, hide text to keep it clean.
        // Otherwise, show the name (CSS handles the partial word clipping).
        if (width < 90) {
            geoPeriod.innerText = "";
        } else {
            geoPeriod.innerText = fullName;
        }
    });

    markers.forEach(marker => {
        const year = parseInt(marker.dataset.year);
        const x = (year - viewStart) * ppx;
        marker.style.left = x + "px";
    });

    document.querySelector(".timeline-line").style.width = timelineWrapper.clientWidth + "px";
}

// Zoom slider
document.getElementById("zoomSlider").addEventListener("input", e => {
    const factor = e.target.value / 100;
    const center = (viewStart + viewEnd) / 2;
    const range = (timelineEnd - timelineStart) / factor;
    viewStart = center - range / 2;
    viewEnd = center + range / 2;
    updatePositions();
});

timelineWrapper.addEventListener("wheel", e => {
    e.preventDefault(); // prevent page scroll

    const range = viewEnd - viewStart;
    const pxYear = pxPerYear();

    if (e.shiftKey) {
        // --- Zoom ---
        const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const rect = timelineWrapper.getBoundingClientRect();
        const mouseX = e.clientX - rect.left; // cursor in pixels
        const mouseYear = viewStart + mouseX / pxYear;

        const newRange = range / zoomFactor;
        viewStart = mouseYear - (mouseYear - viewStart) / zoomFactor;
        viewEnd = viewStart + newRange;

        // Clamp
        if (viewStart < timelineStart) { viewStart = timelineStart; viewEnd = timelineStart + newRange; }
        if (viewEnd > timelineEnd) { viewEnd = timelineEnd; viewStart = timelineEnd - newRange; }

    } else {
        // --- Horizontal scroll ---
        // Invert deltaY to scroll in the natural direction
        const yearShift = -e.deltaY / pxYear; // scroll down → move timeline right
        viewStart += yearShift;
        viewEnd += yearShift;

        // Clamp
        if (viewStart < timelineStart) { viewStart = timelineStart; viewEnd = timelineStart + range; }
        if (viewEnd > timelineEnd) { viewEnd = timelineEnd; viewStart = timelineEnd - range; }
    }

    updatePositions();
});

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let viewStartOnDrag = viewStart;
let viewEndOnDrag = viewEnd;
let timelineStartTop = 0; // initial top of timeline

timelineWrapper.addEventListener("mousedown", e => {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    viewStartOnDrag = viewStart;
    viewEndOnDrag = viewEnd;
    timelineStartTop = parseFloat(getComputedStyle(timeline).top) || 0;
    timelineWrapper.style.cursor = "grabbing";
});

window.addEventListener("mousemove", e => {
    if (!isDragging) return;

    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;

    // horizontal
    const range = viewEndOnDrag - viewStartOnDrag;
    const pxYear = pxPerYear();
    const yearShift = dx / pxYear;
    viewStart = viewStartOnDrag - yearShift;
    viewEnd = viewEndOnDrag - yearShift;

    if (viewStart < timelineStart) { viewStart = timelineStart; viewEnd = timelineStart + range; }
    if (viewEnd > timelineEnd) { viewEnd = timelineEnd; viewStart = timelineEnd - range; }

    // vertical: move timeline element itself
    timeline.style.top = timelineStartTop + dy + "px";

    updatePositions();
});

window.addEventListener("mouseup", e => {
    isDragging = false;
    timelineWrapper.style.cursor = "grab";
});

// Pan buttons
document.getElementById("panLeft").addEventListener("click", () => pan(-0.2));
document.getElementById("panRight").addEventListener("click", () => pan(0.2));

function pan(fraction) {
    const range = viewEnd - viewStart;
    const shift = range * fraction;
    viewStart += shift;
    viewEnd += shift;

    if (viewStart < timelineStart) { viewStart = timelineStart; viewEnd = timelineStart + range; }
    if (viewEnd > timelineEnd) { viewEnd = timelineEnd; viewStart = timelineEnd - range; }

    updatePositions();
}

// Initial render
updatePositions();

// Optional: update on window resize
window.addEventListener("resize", updatePositions);