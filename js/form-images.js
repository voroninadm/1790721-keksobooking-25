const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const defaultAvatarSrc = 'img/muffin-grey.svg';

const adImageInput = document.querySelector('#images');
const adImageBlock = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const onAvatarChange = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      avatarPreview.src = URL.createObjectURL(file);
    }
  });
};

const setAvatarOnDefault = () => {
  avatarPreview.src = defaultAvatarSrc;
};


const onImageAdd = () => {
  adImageInput.addEventListener('change', () => {
    const file = adImageInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imgSrc = URL.createObjectURL(file);
      const newImg = `<img class="popup__photo" src="${imgSrc}" width="150" height="150"></img>`;
      return adImageBlock.insertAdjacentHTML('beforeend', newImg);
    }
  });
};

const setImagesOnDefault = () => {
  while (adImageBlock.firstChild) {
    adImageBlock.removeChild(adImageBlock.firstChild);
  }
};

export {onAvatarChange, setAvatarOnDefault, onImageAdd, setImagesOnDefault};
