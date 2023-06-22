import { startWidget } from './modules/widgetService.js';

const widgetInit = (appContainer) => {

  const widget = startWidget();

  appContainer.append(widget);
  
}

// const app = document.querySelector('#app');

widgetInit(document.querySelector('#app'));