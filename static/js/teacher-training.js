const programs = [
  {
    center: "Rishikesh Yog Peeth",
    city: "Rishikesh",
    style: "Hatha",
    duration: "200 Hours",
    description: "One of India's top-rated Hatha yoga TTCs located in the spiritual heart of yoga."
  },
  {
    center: "Patanjali Yogpeeth",
    city: "Haridwar",
    style: "Ashtanga",
    duration: "300 Hours",
    description: "Offers deep knowledge of Ashtanga yoga with holistic training modules."
  },
  {
    center: "Iyengar Yoga Institute",
    city: "Pune",
    style: "Iyengar",
    duration: "100 Hours",
    description: "Perfect for precision-focused practitioners looking to teach yoga."
  }
];

const programList = document.getElementById('programList');
const searchInput = document.getElementById('searchInput');
const styleFilter = document.getElementById('styleFilter');

function displayPrograms(filteredPrograms) {
  programList.innerHTML = "";
  if (filteredPrograms.length === 0) {
    programList.innerHTML = "<p>No programs match your search.</p>";
    return;
  }
  filteredPrograms.forEach(program => {
    const card = document.createElement('div');
    card.className = "program-card";
    card.innerHTML = `
      <h3>${program.center}</h3>
      <p class="center">${program.city} - ${program.style} Yoga</p>
      <p><strong>Duration:</strong> ${program.duration}</p>
      <p>${program.description}</p>
    `;
    programList.appendChild(card);
  });
}

function filterPrograms() {
  const query = searchInput.value.toLowerCase();
  const style = styleFilter.value;
  const filtered = programs.filter(p => {
    return (
      (p.center.toLowerCase().includes(query) ||
       p.city.toLowerCase().includes(query) ||
       p.style.toLowerCase().includes(query)) &&
      (style === "" || p.style === style)
    );
  });
  displayPrograms(filtered);
}

searchInput.addEventListener('input', filterPrograms);
styleFilter.addEventListener('change', filterPrograms);

// Initial load
displayPrograms(programs);
