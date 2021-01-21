import { default as galleryArray } from './gallery-items.js';

const ref = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('.lightbox__button'),
  modalImg: document.querySelector('.lightbox__image'),
  backDrop: document.querySelector('.lightbox__overlay'),
};

galleryArray.forEach(({ original, preview, description }) =>
  ref.gallery.insertAdjacentHTML(
    'beforeend',
    `<li class="gallery__item">
      <a class="gallery__link" href="${original}">
      <img class="gallery__image"
      src="${preview}" 
      data-sourse="${original}"
      alt="${description}" >
      </a>
    </li>`,
  ),
);
const openModal = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  ref.modalImg.src = event.target.dataset.sourse;
  ref.modalImg.alt = event.srcElement.alt;
  ref.modal.classList.add('is-open');
};
const closeModal = () => {
  ref.modal.classList.remove('is-open');
  ref.modalImg.src = '';
  ref.modalImg.alt = '';
};
ref.gallery.addEventListener('click', openModal);
ref.closeBtn.addEventListener('click', closeModal);
ref.backDrop.addEventListener('click', closeModal);

//======================================================================
//задание с заменой изображения при нажатии клавиш ЛЕВО и ПРАВО ивыход при нажатии ESCAPE:
// не уверен, что это грамотное решение, но т.к. (пока, что)
// задание было дополнительным, то сделал как звезды подсказали

const moveLeft = () => {
  for (let i = 0; i < galleryArray.length; i += 1) {
    if (galleryArray[i].description === ref.modalImg.alt) {
      if (galleryArray[0].description === ref.modalImg.alt) {
        return;
      }
      ref.modalImg.src = galleryArray[i - 1].original;
      ref.modalImg.alt = galleryArray[i - 1].description;
      return;
    }
  }
};

const moveRight = () => {
  for (let i = 0; i < galleryArray.length; i += 1) {
    if (galleryArray[i].description === ref.modalImg.alt) {
      if (
        galleryArray[galleryArray.length - 1].description === ref.modalImg.alt
      ) {
        return;
      }
      ref.modalImg.src = galleryArray[i + 1].original;
      ref.modalImg.alt = galleryArray[i + 1].description;
      return;
    }
  }
};

window.addEventListener('keyup', event => {
  if (event.code === 'Escape') {
    closeModal();
  }
  if (event.code === 'ArrowLeft') {
    moveLeft();
  }
  if (event.code === 'ArrowRight') {
    moveRight();
  }
});
