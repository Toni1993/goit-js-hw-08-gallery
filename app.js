const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
]

const gallery = document.querySelector('.js-gallery')

const galleryList = galleryItems
  .map(image => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${image.original}">
        <img
          class="gallery__image"
          src="${image.preview}"
          data-source="${image.original}"
          alt="${image.description}"
        />
      </a>
    </li>    
  `
  })
  .join('')

gallery.insertAdjacentHTML('afterbegin', galleryList)

const lightbox = document.querySelector('.js-lightbox')
const lightboxImage = lightbox.querySelector('.lightbox__image')
const preloader = lightbox.querySelector('.preloader')
const closeButton = lightbox.querySelector('.lightbox__button')
const lightboxOverlay = lightbox.querySelector('.lightbox__overlay')

function closePopup() {
  lightbox.classList.remove('is-open')
  lightboxImage.classList.add('hidden')
}

gallery.addEventListener('click', event => {
  if (!event.target.classList.contains('gallery__image')) return
  event.preventDefault()
  lightboxImage.src = null
  lightboxImage.alt = null
  lightboxImage.src = event.target.getAttribute('data-source')
  lightboxImage.alt = event.target.getAttribute('alt')
  preloader.classList.remove('hidden')
  lightboxImage.onload = () => {
    preloader.classList.add('hidden')
    lightboxImage.classList.remove('hidden')
  }
  lightbox.classList.add('is-open')
})

closeButton.addEventListener('click', closePopup)
lightboxOverlay.addEventListener('click', closePopup)
document.addEventListener('keydown', event => {
  let currentImage = galleryItems.find(item => item.original === lightboxImage.src)
  if (event.key === 'Escape') closePopup()
  if (event.key === 'ArrowRight') {
    let isLast = galleryItems.indexOf(currentImage) === galleryItems.length - 1
    let nextImage = galleryItems[isLast ? 0 : galleryItems.indexOf(currentImage) + 1]
    setImage(nextImage)
  }
  if (event.key === 'ArrowLeft') {
    let isFirst = galleryItems.indexOf(currentImage) === 0
    let previousImage = galleryItems[isFirst ? galleryItems.length - 1 : galleryItems.indexOf(currentImage) - 1]
    setImage(previousImage)
  }
})

function setImage(image) {
  lightboxImage.classList.add('hidden')
  preloader.classList.remove('hidden')
  lightboxImage.src = image.original
  lightboxImage.alt = image.description
  lightboxImage.onload = () => {
    preloader.classList.add('hidden')
    lightboxImage.classList.remove('hidden')
  }
}
