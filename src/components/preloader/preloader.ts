import { templatePreloader } from './template';

export function drawWaitForServer(container: HTMLElement) {
  const waitForServer = document.createElement('div');
  waitForServer.classList.add('wait-for-server', 'text');
  waitForServer.innerHTML = templatePreloader;
  container.append(waitForServer);
}
