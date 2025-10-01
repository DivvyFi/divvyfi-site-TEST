// Load properties from JSON
fetch("properties.json")
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById("carousel");
    let totalYield = 0;

    data.forEach(p => {
      totalYield += p.yield;
      const card = document.createElement("div");
      card.className = "flex-none w-80 bg-gray-800 p-4 rounded shadow snap-center cursor-pointer";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="rounded mb-4">
        <h3 class="text-xl font-bold mb-1">${p.name}</h3>
        <p class="text-gray-400">${p.location}</p>
        <p class="mt-2">Yield: <span class="text-indigo-400">${p.yield}%</span></p>
      `;
      card.addEventListener("click", () => showModal(p));
      carousel.appendChild(card);
    });

    // Dashboard update
    document.getElementById("totalInvested").innerText = "$50,000";
    document.getElementById("avgYield").innerText = (totalYield / data.length).toFixed(1) + "%";
    document.getElementById("ownedProps").innerText = data.length;
  });

// Calculator
document.getElementById("calcForm").addEventListener("submit", e => {
  e.preventDefault();
  const invest = parseFloat(document.getElementById("investment").value);
  const rate = parseFloat(document.getElementById("rate").value)/100;
  const years = parseInt(document.getElementById("years").value);
  const result = invest * Math.pow(1 + rate, years);
  document.getElementById("calcResult").innerText = `Future Value: $${result.toFixed(2)}`;
});

// Modal functions
function showModal(property){
  document.getElementById("modalContent").innerHTML = `
    <h3 class="text-xl font-bold mb-2">${property.name}</h3>
    <img src="${property.image}" class="rounded mb-2">
    <p>${property.location}</p>
    <p>Yield: ${property.yield}%</p>
  `;
  document.getElementById("propertyModal").classList.remove("hidden");
}
document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("propertyModal").classList.add("hidden");
});

