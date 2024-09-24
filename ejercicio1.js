const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const userInfoDiv = document.getElementById('user-info');
const postsDiv = document.getElementById('posts');
const resultsDiv = document.getElementById('results');

async function getUser(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  return await response.json();
}


async function getUserPosts(userId) {
  const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  return await response.json();
}


async function main() {
  const userId = 1;  


  const user = await getUser(userId);
  userInfoDiv.innerHTML = `
    <p><strong>Nombre:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Teléfono:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <hr>
    `;


  const posts = await getUserPosts(userId);
  postsDiv.innerHTML = posts.map(post => `
    <div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>
  `).join('');


  const postTitles = posts.map(post => post.title);
  const longPosts = posts.filter(post => post.title.length > 50);
  const totalTitleChars = postTitles.reduce((acc, title) => acc + title.length, 0);

 
  resultsDiv.innerHTML = `
  
    <h3>Títulos de los posts:</h3>
    <p>${postTitles.join(', ')}</p>
    <hr>
    <h3>Posts con título largo (más de 50 caracteres):</h3>
    <p>${longPosts.map(post => post.title).join(', ')}</p>
    <hr>
    <h3>Número total de caracteres en todos los títulos:</h3>
    <p>${totalTitleChars}</p>
  `;
}

main().catch(err => console.error("Error:", err));
