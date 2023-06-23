import { startWidget } from "./widgetService.js";

export const changeCity = (appContainer, widgetContainer) => {

  const changeCityBtn = widgetContainer.querySelector('.widget__change-city');

  changeCityBtn.addEventListener('click', () => {
    const widgetForm = document.createElement('form');
    widgetForm.classList.add('widget__form');

    const inputText = document.createElement('input');
    inputText.classList.add('widget__input');
    inputText.name = 'city';
    inputText.type = 'sesarch';
    inputText.placeholder = 'Введите город';

    widgetForm.append(inputText);
    widgetContainer.append(widgetForm);

    inputText.focus();

    widgetForm.addEventListener('submit', async e => {
      e.preventDefault();

      appContainer.textContent = '';

      const refreshWidget = await startWidget(inputText.value);
      appContainer.append(refreshWidget);

      changeCity(appContainer, widgetContainer);
    })
  });

}