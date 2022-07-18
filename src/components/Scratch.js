import React, { useEffect, useRef } from 'react';
import '../css/index.css'
import { getBallImage, CIRCLE, PADDING } from '../utilities/method'


const Scratch = () => {
  const ref = useRef();
  const urlSearchParams = new URLSearchParams(decodeURIComponent(window.location.search));

  const params = Object.fromEntries(urlSearchParams.entries());


  useEffect(() => {

    const canvas = ref.current
    const ctx = canvas.getContext('2d');
    let canvasHeight, canvasWidth


    const handleResize = e => {
      canvasHeight = window.innerHeight - PADDING.VERTICAL;
      canvasWidth = window.innerWidth - PADDING.HORIZONTAL;
      canvas.height = canvasHeight
      canvas.width = canvasWidth
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const area = canvasWidth * canvasHeight;
    const newImage = new Image();
    newImage.src = require("../images/scratch_off_cover.png")

    // render canvas
    newImage.onload = function () {
      ctx.drawImage(newImage, 0, 0, canvasWidth, canvasHeight);
    };
    ctx.beginPath();
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);


    //核心代码 显示原来的不在后来区域的部分
    function moveFunc(x, y) {

      ctx.globalCompositeOperation = "destination-out";


      ctx.beginPath();
      ctx.arc(x, y, CIRCLE.BRUSH, 0, Math.PI * 2, true);

      ctx.closePath();
      ctx.fill();

      //  刮开70% 自动刮开全部
      newImage.onload = function () {
        const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data

        scrapeNum = 0;
        for (const i = 3; i < data.length; i += 4) {
          if (data[i] === 0) {
            scrapeNum++;
          }
        }
        if (scrapeNum > area * 0.7) {

          ctx.clearRect(0, 0, canvasWidth, canvasHeight);


        }

      };

    }


    //鼠标按下开刮
    canvas.onmousedown = function () {

      canvas.onmousemove = function (e) {
        eventMove(e)
      };
    };
    canvas.ontouchstart = function () {
      canvas.ontouchmove = (e) => {
        eventMove(e)
      }
    };




    function eventMove(e) {
      e.preventDefault();

      const offsetX = canvas.offsetLeft;
      const offsetY = canvas.offsetTop;

      //changedTouches The last finger information that triggered the event
      if (e.changedTouches) {
        e = e.changedTouches[e.changedTouches.length - 1];
      }
      const x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0;

      const y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;


      moveFunc(x, y)

    }

    return () => window.removeEventListener("resize", handleResize);
  }, [])


  return (
    <>

      <canvas ref={ref} id="canvas" className='scratch__content' width="260" height="130"></canvas>
      <div className='scratch'>
        <div className='scratch__container'>

          <div className='scratch__secret'>
            <img className='scratch__ball' src={getBallImage(params?.ballColor)}></img>
            <p className='scratch__text'>{params?.ballValue}</p>
            <p className='scratch__zodiac'>{params?.ballZodiac}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Scratch