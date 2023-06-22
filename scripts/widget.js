import { startWidget } from './modules/widgetService.js';

const widgetInit = async (appContainer) => {

  const widget = await startWidget();

  appContainer.append(widget);
  
}

widgetInit(document.querySelector('#app'));