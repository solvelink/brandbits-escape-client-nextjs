export const scrollIntoView = (elem?: HTMLElement | null) => {
  if (elem) {
    const rect = elem.getBoundingClientRect();
    const marginBottom = 96 + 24;
    const viewportHeight = window.innerHeight;
    if (rect.bottom > viewportHeight - marginBottom) {
      window.scrollBy({
        top: rect.bottom - (viewportHeight - marginBottom),
        behavior: "smooth",
      });
    } else {
      elem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }
};
