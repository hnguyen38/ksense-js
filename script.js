const table = document.getElementById("ul");

//get users
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => showUsers(data));

//display users
function showUsers(data) {
  for (let i = 0; i < data.length; i++) {
    const userList = document.createElement("li");
    let name = document.createElement("h1");
    let btn = document.createElement("button");
    let hideBtn = document.createElement("button");

    userList.setAttribute("id", "userInfo");
    name.innerHTML = data[i].name;
    btn.innerHTML = "See Posts";
    hideBtn.innerHTML = "Hide Posts";
    btn.setAttribute("id", data[i].id);
    hideBtn.setAttribute("id", data[i].id);
    hideBtn.style.display = "none";

    btn.onclick = function () {
      btn.style.display = "none";
      hideBtn.style.display = "block";
      const list = userList;
      appendPosts(btn.id, list);
    };

    hideBtn.onclick = function () {
      const user = userList;
      removePosts(hideBtn, btn, user);
    };

    userList.appendChild(name);
    userList.appendChild(btn);
    userList.appendChild(hideBtn);
    table.appendChild(userList);
  }
}

//append posts
function appendPosts(id, list) {
  const postList = document.createElement("li");

  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let title = document.createElement("h3");
        let body = document.createElement("span");

        postList.setAttribute("id", `post${data[i].userId}`);

        title.innerHTML = data[i].title;
        body.innerHTML = data[i].body;

        postList.appendChild(title);
        postList.appendChild(body);
      }
      list.appendChild(postList);
    });
}

//remove posts
function removePosts(hideBtn, btn, user) {
  hideBtn.style.display = "none";
  btn.style.display = "block";
  const list = document.getElementById(`post${hideBtn.id}`);
  user.removeChild(list);
}
