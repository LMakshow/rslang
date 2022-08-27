import templateLogout from './template';

export const addLogout: () => void = () => {
  const container = document.querySelector('.options') as HTMLDivElement;
  container.innerHTML = templateLogout;
};
