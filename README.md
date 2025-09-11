<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dream Animation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    body {
      background-color: #021027;
    }

    .container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
    }

    .background {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      -webkit-mask-image: radial-gradient(white 0%, white 30%, transparent 80%, transparent);
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
      -webkit-mask-size: cover;
      mask-image: radial-gradient(white 0%, white 30%, transparent 80%, transparent);
    }

    .circle-container {
      position: absolute;
      transform: translateY(-10vh);
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    .circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      mix-blend-mode: screen;
      background-image: radial-gradient(
        hsl(180, 100%, 80%),
        hsl(180, 100%, 80%) 10%,
        hsla(180, 100%, 80%, 0) 56%
      );
      animation: fade-frames 2000ms infinite, scale-frames 2s infinite;
    }

    @keyframes fade-frames {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }

    @keyframes scale-frames {
      0% { transform: scale3d(0.4, 0.4, 1); }
      50% { transform: scale3d(2.2, 2.2, 1); }
      100% { transform: scale3d(0.4, 0.4, 1); }
    }

    .message {
      position: absolute;
      right: 20px;
      bottom: 10px;
      color: white;
      font-family: "Josefin Slab", serif;
      line-height: 27px;
      font-size: 18px;
      text-align: right;
      pointer-events: none;
      animation: message-frames 1.5s ease 5s forwards;
      opacity: 0;
    }

    @keyframes message-frames {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/221808/sky.jpg" class="background" />

    <!-- 100 floating circles -->
    <script>
      const container = document.querySelector('.container');
      for (let i = 0; i < 100; i++) {
        const cWrap = document.createElement('div');
        cWrap.className = 'circle-container';
        const c = document.createElement('div');
        c.className = 'circle';

        // randomize size
        const size = Math.random() * 8 + 2;
        cWrap.style.width = `${size}px`;
        cWrap.style.height = `${size}px`;

        // randomize position & movement
        const startY = 100 + Math.random() * 20;
        const startX = Math.random() * 100;
        const endY = -startY - Math.random() * 30;
        const duration = 20000 + Math.random() * 15000;
        const delay = Math.random() * 30000;

        const moveName = `move-${i}`;
        const style = document.createElement('style');
        style.innerHTML = `
          @keyframes ${moveName} {
            from { transform: translate3d(${startX}vw, ${startY}vh, 0); }
            to { transform: translate3d(${Math.random()*100}vw, ${endY}vh, 0); }
          }
        `;
        document.head.appendChild(style);

        cWrap.style.animation = `${moveName} ${duration}ms linear ${delay}ms infinite`;

        cWrap.appendChild(c);
        container.appendChild(cWrap);
      }
    </script>

    <p class="message">
      all your dreams can come true<br>if you have the courage to pursue them
    </p>
  </div>
</body>
</html>
