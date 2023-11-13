const apiUrl = 'http://localhost:3000/api/';

// Function to make a GET request
function getApi() {
  const resource = document.getElementById('resource').value;
  const id = document.getElementById('id').value;
  
  fetch(`${apiUrl}${resource}/${id}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('GET request error:', error));
}

// Function to make a POST request
function postApi() {
  const resource = document.getElementById('resource').value;
  const formData = new FormData(document.getElementById('apiForm'));

  fetch(`${apiUrl}${resource}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('POST request error:', error));
}

// Function to make a PUT request
function putApi() {
  const resource = document.getElementById('resource').value;
  const id = document.getElementById('id').value;
  const formData = new FormData(document.getElementById('apiForm'));

  fetch(`${apiUrl}${resource}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('PUT request error:', error));
}

// Function to make a DELETE request
function deleteApi() {
  const resource = document.getElementById('resource').value;
  const id = document.getElementById('id').value;

  fetch(`${apiUrl}${resource}/${id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.status === 204) {
        document.getElementById('response').innerText = 'Resource deleted successfully.';
      } else {
        document.getElementById('response').innerText = 'Failed to delete resource.';
      }
    })
    .catch(error => console.error('DELETE request error:', error));
}
