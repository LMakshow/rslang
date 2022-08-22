/**
 * Creates some element with a template and classes and appends it to the parent container
 * @param tag - tag of the element to create
 * @param templateElement - innerHTML of the element to create
 * @param container - parent of the element
 * @param classStyle - add a style (string) or multiple styles (string array)
 * @param isAfter - if true, the created element is added at the end of the container
 */
const renderElement = (
  tag: string,
  templateElement: string,
  container: HTMLElement,
  classStyle?: string | string[],
  isAfter?: boolean
) => {
  const element: HTMLElement = document.createElement(tag) as HTMLElement;

  if (typeof classStyle === 'string') {
    element.classList.add(classStyle);
  }

  if (Array.isArray(classStyle)) {
    classStyle.forEach((style) => element.classList.add(style));
  }

  element.innerHTML = templateElement;

  isAfter ? container.after(element) : container.append(element);
};

export default renderElement;
