const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const userInfoDiv = document.getElementById('user-info');
const albumsDivMain = document.getElementById('albums');
const photosDiv = document.getElementById('photos');


async function getAllUsers() {
    const response = await fetch(`${API_BASE_URL}/users`); 
    return await response.json();
  }

async function getAlbumsUser(userId) {
    const response = await fetch(`${API_BASE_URL}/albums?userId=${userId}`);
    return await response.json();
  }

async function getPhotosInAlbum(albumId) {
    const response = await fetch(`${API_BASE_URL}/photos?albumId=${albumId}`);
    return await response.json();
    
}
async function main() { 
    const users = await getAllUsers();

    userInfoDiv.innerHTML = users.map(user => `
      <div class="user">
        <p><strong>Nombre:</strong> ${user.name}</p>
        <hr>
        </div>
        `).join('');

        let allQuiAlbums = []; 
        let totalPhotosQui = 0; 

    for (const user of users) {
        const albums = await getAlbumsUser(user.id);
        const albumsDiv = document.createElement('div');
        albumsDiv.innerHTML = `
          <h3>Albumes de ${user.name}:</h3>
          ${albums.map(album => `<div class="albums"><h5>${album.id}. ${album.title}</h5></div>`).join('')}
        `;
    

    albumsDivMain.appendChild(albumsDiv);

    const albumsQui = albums.filter(album => album.title.includes('qui'));
    allQuiAlbums = allQuiAlbums.concat(albumsQui);

    const photosQui = await Promise.all(albumsQui.map(album => getPhotosInAlbum(album.id)));
    totalPhotosQui += photosQui.reduce((acc, photos) => acc + photos.length, 0);

    photosDiv.innerHTML = `
        <h3>Albumes con la palabra 'qui':</h3>
         <p>${allQuiAlbums.map(album => album.title).join(', ')}</p>
        <hr>
        <h3>Total de fotos en albumes con la palabra 'qui':</h3>
        <p>${totalPhotosQui}</p>
        `;

}
}
main().catch(err => console.error("Error:", err));
