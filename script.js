let usersData = [];

async function fetchUsers() {
  const count = document.getElementById("userCount").value;
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";
  usersData = [];

  if (!count || count < 1 || count > 1000) {
    errorDiv.textContent = "Please enter a number between 1 and 1000.";
    return;
  }

  try {
    const res = await fetch(`https://randomuser.me/api/?results=${count}`);
    if (!res.ok) throw new Error("Failed to fetch data from API");

    const data = await res.json();
    usersData = data.results;
    renderUsers();
  } catch (err) {
    errorDiv.textContent = "Error fetching users: " + err.message;
  }
}

function renderUsers() {
  const usersDiv = document.getElementById("users");
  const nameType = document.getElementById("nameType").value;

  if (usersData.length === 0) {
    usersDiv.innerHTML = "";
    return;
  }

  let nameRandom = "";
  let genderRandom = "";
  let emailRandom = "";
  let countryRandom = "";

  usersData.forEach(user => {
    const name = nameType === "first" ? user.name.first : user.name.last;
    nameRandom += `<p>${name}</p>`;
    genderRandom += `<p>${user.gender}</p>`;
    emailRandom += `<p>${user.email}</p>`;
    countryRandom += `<p>${user.location.country}</p>`;
  });

  usersDiv.innerHTML = `
    <div>${nameRandom}</div>
    <div>${genderRandom}</div>
    <div>${emailRandom}</div>
    <div>${countryRandom}</div>
  `;
}
