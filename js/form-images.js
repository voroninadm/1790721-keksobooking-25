const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const defaultAvatarSrc = 'img/muffin-grey.svg';

const adImageInput = document.querySelector('#images');
const adImageBlock = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const checkAvatarChange = () => {
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


const checkImageAdd = () => {
  adImageInput.addEventListener('change', () => {
    const file = adImageInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (matches) {
      const imgSrc = URL.createObjectURL(file);
      adImageBlock.innerHTML = `<img class="popup__photo" src="${imgSrc}" width="70" height="70"></img>`;
    }
  });
};


const setImagesOnDefault = () => {
  adImageBlock.innerHTML = '';
};

export {checkAvatarChange, setAvatarOnDefault, checkImageAdd, setImagesOnDefault};
