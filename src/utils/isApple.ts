export const isAppleDevice = () => {
  return (
    /Mac|iPhone|iPad|iPod/.test(navigator.platform) ||
    (/Macintosh/.test(navigator.userAgent) && "ontouchend" in document)
  );
};
