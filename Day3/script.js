const API = "http://localhost:3000/users";

function fetchUsers() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      printUsers(data);
    });
}

function addUser() {
  const id = document.getElementById("addId").value;
  const name = document.getElementById("addName").value;
  const city = document.getElementById("addCity").value;

  if (isNaN(id) || !name || !city) {
    alert("Please fill all fields correctly.");
    return;
  }

  if (id < 0) {
    alert("ID cannot be negative.");
    return;
  }

  fetch(`${API}/${id}`).then((res) => {
    if (res.ok) {
      alert("A user with this ID already exists.");
    } else {
      const newUser = { id, name, address: { city } };
      fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }).then(() => {
        fetchUsers();
        document.getElementById("addId").value = "";
        document.getElementById("addName").value = "";
        document.getElementById("addCity").value = "";
      });
    }
  });
}

function updateUserCity() {
  const id = document.getElementById("updateId").value;
  const newCity = document.getElementById("newCity").value;

  fetch(`${API}/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error("User not found.");
      return res.json();
    })
    .then((user) => {
      user.address.city = newCity;
      return fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    })
    .then(() => {
      fetchUsers();
      document.getElementById("updateId").value = "";
      document.getElementById("newCity").value = "";
    })
    .catch(() => alert("User not found & please enter the correct ID."));
}

function removeUser() {
  const id = document.getElementById("removeId").value;

  fetch(`${API}/${id}`, { method: "DELETE" }).then((res) => {
    if (res.ok) {
      fetchUsers();
      document.getElementById("removeId").value = "";
    } else {
      alert("User not found & please enter the correct ID.");
    }
  });
}

function printUsers(users) {
  const container = document.getElementById("userList");
  container.innerHTML = "";

  if (users.length === 0) {
    container.innerHTML = "<i>No users available.</i>";
    return;
  }

  users.forEach((u) => {
    container.innerHTML += `
      <div class="user-card">
        <div class="user-info">ID: ${u.id}, Name: ${u.name}, City: ${u.address.city}</div>
      </div>
    `;
  });
}

fetchUsers();
