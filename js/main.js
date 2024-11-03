const panorama = new PANOLENS.ImagePanorama('images/DRON_0720.png');
const panoramaNight = new PANOLENS.ImagePanorama('images/NIGHT_2.png');
const panorama2 = new PANOLENS.ImagePanorama('images/DVOR.png');
const panorama3 = new PANOLENS.ImagePanorama('images/CAMERA_360_0000.jpg');
const panorama4 = new PANOLENS.ImagePanorama('images/CAMERA_360_002_0000.jpg');
const panorama5 = new PANOLENS.ImagePanorama('images/CAMERA_1_364_0000.jpg');
const panorama6 = new PANOLENS.ImagePanorama('images/CAMERA_1_360_0000.jpg');
const panorama7 = new PANOLENS.ImagePanorama('images/CAMERA_1_361_0000.png');
const panorama8 = new PANOLENS.ImagePanorama('images/CAMERA_1_362_0000.jpg');
const panorama9 = new PANOLENS.ImagePanorama('images/CAMERA_1_363_0000.jpg');

// Получение контейнера для панорамы
let imageContainer = document.querySelector('.image-container');

// Массив с позициями для точек перехода
var infospotPositions = [
  new THREE.Vector3(3135.12, -2732.44, -2766.28), // Для перехода из панорамы 1 в панораму 2
  new THREE.Vector3(-3136.06, 296.3, -4290.14), // Для перехода из панорамы 2 в панораму 1
  new THREE.Vector3(3460.93, 238.1, -3587.23), // Для перехода из панорамы 2 в панораму 3
];

// Создание Viewer для отображения панорам
const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  controlBar: true,
});

// Связывание панорам с позициями переходов
panorama.link(panorama2, infospotPositions[0]);
panoramaNight.link(panorama2, infospotPositions[0]); // Связь из панорамы 1 в панораму 2
panorama2.link(panorama, infospotPositions[1]);
panorama2.link(panoramaNight, infospotPositions[1]); // Связь из панорамы 2 в панораму 1
panorama2.link(panorama3, infospotPositions[2]); // Связь из панорамы 2 в панораму 3
panorama3.link(panorama4, new THREE.Vector3(1870.33, -474.26, -4603.57));
panorama4.link(panorama5, new THREE.Vector3(-81.3, -629.69, -4952.23));
panorama5.link(panorama6, new THREE.Vector3(-2.98, -605.01, -4959.25));
panorama6.link(panorama7, new THREE.Vector3(-4600.68, -489.0, -1873.0));
panorama7.link(panorama8, new THREE.Vector3(-4745.6, -578.7, -1436.62));
panorama8.link(panorama9, new THREE.Vector3(-4803.32, -515.08, 1250.28));
panorama9.link(panorama5, new THREE.Vector3(-4982.56, -348.57, -71.41));
panorama5.link(panorama4, new THREE.Vector3(-3010.4, -923.54, 3871.97));

// Добавление всех панорам в viewer
viewer.add(
  panorama,
  panorama2,
  panorama3,
  panorama4,
  panorama5,
  panorama6,
  panorama7,
  panorama8,
  panorama9,
  panoramaNight
);

panorama.addEventListener('enter-fade-start', function () {
  viewer.tweenControlCenter(
    new THREE.Vector3(4559.91, -1983.91, 491.24),
    12000
  );
});

panoramaNight.addEventListener('enter-fade-start', function () {
  viewer.tweenControlCenter(
    new THREE.Vector3(4559.91, -1983.91, 491.24),
    12000
  );
});

let isNightMode = false;

// Создание кнопки переключения режима
const toggleButton = document.createElement('button');
toggleButton.innerText = 'Переключить на ночной режим';
toggleButton.style.position = 'absolute';
toggleButton.style.top = '20px';
toggleButton.style.left = '20px';
toggleButton.style.padding = '10px';
toggleButton.style.zIndex = 1000; // Чтобы кнопка была поверх других элементов
document.body.appendChild(toggleButton);

// Добавление обработчика события на кнопку
toggleButton.addEventListener('click', () => {
  isNightMode = !isNightMode;

  if (isNightMode) {
    viewer.setPanorama(panoramaNight); // Устанавливаем ночную панораму
    toggleButton.innerText = 'Переключить на дневной режим'; // Изменяем текст кнопки
  } else {
    viewer.setPanorama(panorama); // Устанавливаем дневную панораму
    toggleButton.innerText = 'Переключить на ночной режим'; // Изменяем текст кнопки
  }
});

// Функция для создания инфоточек с видимым текстом
function createTextInfospotWithPointer(text, position) {
  const infospot = new PANOLENS.Infospot(300, PANOLENS.DataImage.Info);
  infospot.position.copy(position);

  const containerElement = document.createElement('div');
  containerElement.className = 'panorama-text-container';

  const pointerElement = document.createElement('div');
  pointerElement.className = 'panorama-pointer';

  const textElement = document.createElement('div');
  textElement.className = 'panorama-text';
  textElement.innerText = text;

  containerElement.appendChild(pointerElement);
  containerElement.appendChild(textElement);

  infospot.addHoverElement(containerElement, false);
  return infospot;
}

// Добавление текстовых точек перехода с указателем
const infospot1 = createTextInfospotWithPointer(
  'Dauletti qalashyk',
  new THREE.Vector3(4528.79, -2108.56, 12.32)
);
panorama.add(infospot1);

const infospot4 = createTextInfospotWithPointer(
  'ЖК Bailyq',
  new THREE.Vector3(3651.8, -2519.52, -2289.04)
);
panorama.add(infospot4);

const infospot11 = createTextInfospotWithPointer(
  'Dauletti qalashyk',
  new THREE.Vector3(4528.79, -2108.56, 12.32)
);
panoramaNight.add(infospot11);

const infospot44 = createTextInfospotWithPointer(
  'ЖК Bailyq',
  new THREE.Vector3(3651.8, -2519.52, -2289.04)
);
panoramaNight.add(infospot44);

const infospot2 = createTextInfospotWithPointer(
  'ЖК Bailyq',
  new THREE.Vector3(3911.31, 1758.16, -2552.09)
);
panorama2.add(infospot2);

const infospot3 = createTextInfospotWithPointer(
  'Перейти к подъезду',
  new THREE.Vector3(-2776.93, -641.22, -4096.85)
);
panorama4.add(infospot3);
