import checkUrl from './checkUrl';

export default class GalleryControl {
  constructor(galleryDOM) {
    this.galleryDOM = galleryDOM; // класс который управляет DOM
    this.imgs = [
      {
        name: 'Хакер',
        fileUrl: 'https://xakep.ru/wp-content/uploads/2022/09/400775/Hacked.jpg',
      },
      {
        name: 'Разработка',
        fileUrl: 'https://stekspb.ru/upload/%20custom_projects_img/web-teh-audit.jpg',
      },
    ];
  }

  init() {
    this.galleryDOM.addDelImgListeners(this.onDelImg.bind(this));
    this.galleryDOM.addInputChangeListeners(this.onInputChange.bind(this));

    this.renderingTask(); // отрисовка картинок
  }

  // загрузка картинки в инпут
  onInputChange({ name, type, fileUrl }) {
    const imgTrue = checkUrl(type);

    if (!imgTrue) { return; }

    this.imgs.push({ name, fileUrl });
    this.renderingTask(); // отрисовка картинок
  }

  // удаление картинки
  onDelImg({ imgIndex, src, alt }) {
    const img = this.imgs[imgIndex];

    if (!img) { return; } // остановка, если под нет картинки под индексом

    // если название и ссылка совпадает, то удаляется картинка из объекта
    if (img.name === alt && img.fileUrl === src) {
      this.imgs.splice(imgIndex, 1);
    }

    this.renderingTask(); // отрисовка картинок
  }

  // отрисовка картинок
  renderingTask() {
    this.galleryDOM.clearImgs(); // очистка картинок

    const arr = this.imgs;
    for (let i = 0; i < arr.length; i += 1) {
      this.galleryDOM.htmlImg(arr[i].name, arr[i].fileUrl);
    }
  }
}
