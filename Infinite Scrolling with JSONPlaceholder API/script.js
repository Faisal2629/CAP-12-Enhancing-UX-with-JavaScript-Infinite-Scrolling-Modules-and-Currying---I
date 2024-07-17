const gallery = document.getElementById('gallery');
let page = 1;
const limit = 10;
let loading = false;

async function fetchPhotos(page, limit) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch photos');
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function displayPhotos(photos) {
  photos.forEach(photo => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
      <img src="${photo.thumbnailUrl}" alt="${photo.title}">
      <p>${photo.title}</p>
    `;
    gallery.appendChild(galleryItem);
  });
}

async function loadPhotos() {
  if (loading) return;
  loading = true;
  const photos = await fetchPhotos(page, limit);
  displayPhotos(photos);
  page++;
  loading = false;
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loadPhotos();
  }
}

window.addEventListener('scroll', handleScroll);

// Initial load
loadPhotos();
