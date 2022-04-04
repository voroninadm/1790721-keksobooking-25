const avatarInput = document.querySelector('#avatar');
const defaultAvatarSrc = 'img/muffin-grey.svg';
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');

// const adImageInput =document.querySelector('#images');

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

export {onAvatarChange, setAvatarOnDefault};
