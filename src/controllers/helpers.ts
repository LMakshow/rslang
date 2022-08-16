const renderElement = (tag: string, templateElement: string, container: HTMLElement, classStyle?: string) => {
  const element: HTMLElement = document.createElement(tag) as HTMLElement;

  if (classStyle) {
    element.classList.add(classStyle);
  }

  element.innerHTML = templateElement;
  container.append(element);
}

export default renderElement;

