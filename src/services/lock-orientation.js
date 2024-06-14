const LockOrientation = () => {
    let devWidth, devHeight;
    window.addEventListener('load', () => {
      if (window.screen.width < window.screen.height) {
          devWidth  = window.screen.width;
          devHeight = window.screen.height;
      } else {
        devWidth  = window.screen.height;
        devHeight = window.screen.width;
      }
      rotate();
    });
    
    window.addEventListener('orientationchange', function () {
      rotate();
      console.dir(document.body.parentElement.style.width);
      console.dir(document.body.parentElement.style.height);
    }, true);

    const rotate = () => {
      if (devWidth < 1024 && (window.orientation === 90 || window.orientation === -90)) {
        document.body.style.width = devWidth + 'px';
        document.body.style.height = devHeight + 'px';

        if (window.orientation === 90) {
          document.body.style.transform = `rotate(-90deg) translateX(${devHeight - devWidth}px)`;
        } else if (window.orientation === -90) {
          document.body.style.transform = 'rotate(90deg)';
        }
        document.body.style.transformOrigin = ''+(devHeight/2)+'px '+(devHeight/2)+'px';

      } else {
        document.body.removeAttribute('style');
      }
    }
}

export default LockOrientation;