import { changeCity } from './modules/changeCity.js';
import { startWidget } from './modules/widgetService.js';

const widgetInit = async (appContainer) => {

  const widget = await startWidget();

  appContainer.append(widget);

  changeCity(appContainer, widget);
  
}

widgetInit(document.querySelector('#app'));