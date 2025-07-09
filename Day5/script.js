const output = document.getElementById("output");
const loadBtn = document.getElementById("loadBtn");

loadBtn.addEventListener("click", loadUser);

async function loadUser() {
  clearPreData();
  showLoading();

  const url = "https://jsonplaceholder.typicode.com/users/1";

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch user");

    const user = await res.json();
    console.log("check", user);

    await delay();
    displayUser(user);
  } catch (err) {
    clearOutput();
    const errorMsg = document.createElement("p");
    errorMsg.style.color = "red";
    errorMsg.textContent = `Error: ${err.message}`; 
    output.appendChild(errorMsg);
  }
}

function showLoading() {
  const spinner = document.createElement("div");
  spinner.className = "spinner";

  const loadingText = document.createElement("p");
  loadingText.textContent = "Loading user details...";

  output.appendChild(spinner);
  output.appendChild(loadingText);
}

function displayUser(user) {
  clearPreData();

  const card = document.createElement("div");
  card.className = "user-card";

  const name = dataLine("Name", user.name);
  const email = dataLine("Email", user.email);
  const phone = dataLine("Phone", user.phone);
  const website = dataLine("Website", user.website);

  [name, email, phone, website].forEach((el) => card.appendChild(el));

  output.appendChild(card);
}

function dataLine(label, value) {
  const head = document.createElement("label");
  const p = document.createElement("p");
  head.textContent = `${label} : `;
  p.appendChild(head);
  p.appendChild(document.createTextNode(value));
  return p;
}

function clearPreData() {
  output.innerHTML = "";
}

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}
