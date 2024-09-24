
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';


const userInfoDiv = document.getElementById('user-info'); 
const resultsDiv = document.getElementById('results');
const postsDivMain = document.getElementById('posts');


async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`); 
  return await response.json();
}


async function getUserPosts(userId) {
  const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);
  return await response.json();
}


async function main() {
  
  const users = await getAllUsers();
  
  
  userInfoDiv.innerHTML = users.map(user => `
    <div class="user">
      <p><strong>Nombre:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <hr>
      </div>
      `).join('');

    
    for (const user of users) {
      const posts = await getUserPosts(user.id);


      const postsDiv = document.createElement('div');
    postsDiv.innerHTML = `
      <h3>Posts de ${user.name}:</h3>
      ${posts.map(post => `<div class="post"><h5>${post.id}. ${post.title}</h5></div>`).join('')}
     
    `;
      postsDivMain.appendChild(postsDiv);

    
      const postTitles = posts.map(post => post.title);
      const longPosts = posts.filter(post => post.title.length > 50);
      const totalTitleChars = postTitles.reduce((acc, title) => acc + title.length, 0);

      
      resultsDiv.innerHTML += `
        <h3>Resultados para ${user.name}:</h3>
        <hr>
        <h4>Títulos de los posts:</h4>
        <p>${postTitles.join(', ')}</p>
        <hr>
        <h4>Posts con título largo (más de 50 caracteres):</h4>
        <p>${longPosts.map(post => post.title).join(', ')}</p>
        <hr>
        <h4>Número total de caracteres en todos los títulos:</h4>
        <p>${totalTitleChars}</p>
      `;
  }
  
}


main().catch(err => console.error("Error:", err));
