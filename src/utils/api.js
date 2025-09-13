const baseUrl = 'http://localhost:3001';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export { getItems, addItem, deleteItem, addCardLike, removeCardLike };
