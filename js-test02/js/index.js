window.addEventListener("load", () => {
  const sec = document.querySelectorAll(".sec");
  let isFlag = true;
  let sy = window.pageYOffset;
  let stopScrollVal = window.pageYOffset;
  let wh = window.innerHeight;
  let secNum;
  let scrollId;
  let positionY = [];

  // 座標取得
  const positionFunc = () => {
    positionY = [];
    sec.forEach((element) => {
      let clientRect = element.getBoundingClientRect();
      let pyt = window.pageYOffset + clientRect.top;
      let pyb = window.pageYOffset + clientRect.bottom;
      positionY.push({ top: pyt, bottom: pyb });
    });
  };
  positionFunc();

  // 現在の位置
  const currentPosition = () => {
    // sy = window.pageYOffset;
    let isFlag = false;
    positionY.forEach((coordinate, index) => {
      if (sy >= coordinate.top && sy < coordinate.bottom) {
        secNum = index;
        isFlag = true;
      }
    });
    if (!isFlag) {
      if (sy > positionY[positionY.length - 1].top) {
        secNum = positionY.length - 1;
      } else if (sy < positionY[positionY.length - 1].top) {
        secNum = 0;
      }
    }
  };
  currentPosition();

  window.addEventListener("resize", () => {
    positionFunc();
    currentPosition();
  });

  window.addEventListener("scroll", () => {
    sy = window.pageYOffset;
    if (isFlag) {
      isFlag = false;
      if (sy > stopScrollVal) {
        secNum++;
        if (secNum >= positionY.length) {
          secNum = positionY.length;
        } else {
          window.scrollTo({
            top: positionY[secNum].top,
            behavior: "smooth",
          });
        }
      } else {
        secNum--;
        if (secNum < 0) {
          secNum = -1;
        } else {
          window.scrollTo({
            top: positionY[secNum].top,
            behavior: "smooth",
          });
        }
      }
    }
    clearTimeout(scrollId);
    scrollId = setTimeout(() => {
      // currentPosition();
      stopScrollVal = window.pageYOffset;
      isFlag = true;
    }, 100);
  });
});
