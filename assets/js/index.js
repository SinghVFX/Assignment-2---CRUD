// The first block of code sets up an event listener for when the DOM content is loaded. When the event occurs, it gets the form with an ID of "add_post" and adds an event listener to it for when the form is submitted. The event listener calls a function called handleCreatePost.//

document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.getElementById("add_post");

  createPostForm.addEventListener("submit", handleCreatePost);
});

//The next block of code defines the handleCreatePost function. This function prevents the default form submission behavior, gets the form data using FormData, converts it to an object using Object.fromEntries, and then calls the createPost function, passing in the data object.//

async function handleCreatePost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData.entries());

  await createPost(data);
}

//The createPost function is an asynchronous function that takes in the data object and sends a POST request to the server with the data in the request body. It also includes an authorization header with a token obtained from the getTokenFromLocalStorage function. If the request is successful, it alerts the user with the message returned from the server and logs an error message to the console if there is any. If there is an error, it logs the error to the console.//

const createPost = async (data) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const postData = await response.json();

    alert(`${postData.message}`);
    console.error(`${postData.message}`);
  } catch (error) {
    console.error(`Error creating post: ${error.response}`);
  }
};

//The next block of code sets up an event listener for when the DOM content is loaded. When the event occurs, it gets the form with an ID of "update_post" and adds an event listener to it for when the form is submitted. The event listener calls a function called handleUpdatepost.//

document.addEventListener("DOMContentLoaded", () => {
  const updatepostForm = document.getElementById("update_post");

  updatepostForm.addEventListener("submit", handleUpdatepost);
});

//The handleUpdatepost function is similar to the handleCreatePost function, except that it calls the updatepost function instead of the createPost function.//

async function handleUpdatepost(event) {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData.entries());

  await updatepost(data);
}

//The updatepost function is similar to the createPost function, except that it sends a PUT request to update an existing post with the data in the request body. It includes an authorization header with a token obtained from the getTokenFromLocalStorage function. If the request is successful, it alerts the user with the message returned from the server and logs an error message to the console if there is any. If there is an error, it alerts the user with the error message and logs the error to the console.//

const updatepost = async (data) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`http://localhost:3000/api/posts/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const postData = await response.json();

    alert(`${postData.message}`);
    console.error(`${postData.message}`);
  } catch (error) {
    alert(`${error}`);
    console.log(`Error updating post: ${error.response}`);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".table tbody td a.delete");

  deleteButtons.forEach((button) => {
    const id = button.getAttribute("data-id");

    button.addEventListener("click", (event) => handleDeletepost(event, id));
  });
});

async function handleDeletepost(event, id) {
  event.preventDefault();

  await deletepost(id);
}

//The third block of code adds another event listener to the DOMContentLoaded event, this time to handle deleting posts. The callback function for this event gets all the HTML anchor elements with the class "delete" inside the table's body and adds event listeners to them.//

const deletepost = async (id) => {
  const token = getTokenFromLocalStorage();

  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const postData = await response.json();

    alert(`${postData.message}`);

    location.reload();

    console.error(`${postData.message}`);
  } catch (error) {
    console.error(`Error deleting post: ${error}`);
  }
};
