<template>
  <div class="hello">
    <img class="ak_logo" alt="Vue logo" src="../assets/ak_logo.svg">

    <div>
      <aside class="split leftside">

      </aside>
      <aside class="split rightside yellow_bg">
      </aside>
    </div>

    <aside class="details">
      <span class="hello_txt">Hello, I'm in</span>
      <span class="name_txt">Ashok</span>
      <span class="deg_txt">Software Developer</span>
    </aside>
    <img class="ak_img fade-in-right" alt="Vue logo" src="../assets/ak_trans.png">
    <aside class="contact_link">
      <a href="https://www.linkedin.com/in/ashokkumar-nkk" target="_blank"> <svg aria-hidden="true" focusable="false"
          data-prefix="fab" data-icon="linkedin"
          class=" prefix__svg-inline--fa prefix__fa-linkedin svg-inline--fa prefix__fa-w-16 fa-linkedin" role="img"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="31" height="31" fill="#2c3e50">
          <path fill="#2c3e50"
            d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z">
          </path>
        </svg>
      </a>
      <a href="https://x.com/Ak_Aananth" target="_blank"><svg  width="29"  fill="#2c3e50" height="29" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 509.64"><rect width="512" height="509.64" rx="115.61" ry="115.61"/><path fill="#fff" fill-rule="nonzero" d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"/></svg>
      </a>

      <a href="https://www.instagram.com/ashok_aananth/" target="_blank" ><svg  width="28"  fill="#2c3e50" height="28" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 512"><path fill-rule="nonzero" d="M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.482 47.121-.092 85.407 38.029 85.499 85.159.091 47.13-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.092c.141 72.602 59.106 131.327 131.69 131.185 72.592-.14 131.35-59.089 131.209-131.691-.141-72.577-59.114-131.336-131.715-131.194-72.585.141-131.325 59.114-131.184 131.7zm237.104-137.092c.033 16.954 13.817 30.682 30.772 30.649 16.961-.034 30.689-13.811 30.664-30.765-.033-16.954-13.818-30.69-30.78-30.656-16.962.033-30.689 13.818-30.656 30.772zm-208.696 345.4c-24.958-1.086-38.511-5.234-47.543-8.709-11.961-4.628-20.496-10.177-29.479-19.093-8.966-8.951-14.532-17.461-19.202-29.397-3.508-9.033-7.73-22.569-8.9-47.527-1.269-26.983-1.559-35.078-1.683-103.433-.133-68.338.116-76.434 1.294-103.441 1.069-24.941 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.478 8.949-8.983 17.459-14.532 29.403-19.202 9.025-3.526 22.561-7.715 47.511-8.9 26.998-1.278 35.085-1.551 103.423-1.684 68.353-.133 76.448.108 103.456 1.294 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.145 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.413 3.524 8.999 7.714 22.552 8.892 47.494 1.285 26.998 1.576 35.094 1.7 103.432.132 68.355-.117 76.451-1.302 103.442-1.087 24.957-5.226 38.52-8.709 47.56-4.629 11.953-10.161 20.488-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.56-103.448 1.684-68.338.133-76.424-.124-103.431-1.294zM149.977 1.773c-27.239 1.286-45.843 5.648-62.101 12.019-16.829 6.561-31.095 15.353-45.286 29.603C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.548 1.302 27.231 5.649 45.827 12.019 62.092 6.569 16.83 15.353 31.089 29.611 45.289 14.25 14.2 28.55 22.918 45.404 29.438 16.282 6.294 34.902 10.583 62.15 11.777 27.305 1.203 36.022 1.468 105.521 1.336 69.532-.133 78.25-.44 105.555-1.734 27.239-1.302 45.826-5.664 62.1-12.019 16.829-6.585 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.404 6.304-16.282 10.592-34.904 11.777-62.134 1.195-27.323 1.478-36.049 1.344-105.557-.133-69.516-.447-78.225-1.741-105.522-1.294-27.256-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.08-29.602-45.288-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.304-34.903-10.6-62.15-11.778C333.747.164 325.03-.101 255.506.031c-69.507.133-78.224.431-105.529 1.742z"/></svg></a>

      <a href="mailto:nkkashokkumar007@gmail.com" target="_blank" rel="noopener noreferrer"> <svg
          xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 134 102" fill="#2c3e50">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M111.5 3.8L103 10.1L66.7 37.4L30.3 10.1L21.8 3.7C12.8 -3 0 3.4 0 14.7V26.8V92C0 97 4.1 101.1 9.1 101.1H30.3V49.5L66.7 76.8L103 49.5V101H124.2C129.2 101 133.3 96.9 133.3 91.9V26.8V14.7C133.3 3.4 120.5 -3 111.5 3.8Z"
            fill="#2c3e50" />
        </svg></a>
        


    </aside>
    <!-- <div class="red_bg">

    </div> -->


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.yellow_bg {
  background: #ffcb54;
  height: 100vh;
}

.red_bg {
  background: #ff5454;
  height: 100vh;
}

.hello {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.ak_img {
  position: absolute;
  bottom: 0px;
  right: -10px;
  height: 67%;
}

.ak_logo {
  position: absolute;
  top: 2%;
  left: 2%;
  height: 100px;
}

@keyframes fadeInRight {
  0% {
    opacity: 0;
    transform: translateX(50%);

  }

  100% {
    opacity: 1;
    transform: translateX(0);

  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    /* transform: translateX(50%); */
    transform: translate(-50%, -100%);

  }

  100% {
    opacity: 1;
    transform: translate(-50%, -50%);
    /* transform: translateX(-50%); */

  }
}


.fade-in-right {
  animation: fadeInRight 1.4s ease-in-out forwards;
}

.fade-in-up {
  animation: fadeInUp 1.4s ease-in-out forwards;
}

.details {
  width: 300px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;
  background: #fff;
  border: 1px solid #ffcb54;
  border-radius: 8px;
  animation: fadeInUp 1.4s ease-in-out forwards;
  /* animation: fadeInUp 2s ; */
}

.hello_txt {
  font-size: 12px;
}

.name_txt {
  font-size: 48px;
}

.deg_txt {
  font-size: 24px;
}

.split {
  width: 50%;
  height: 100vh;
  position: absolute;
}

.leftside {
  left: 0;
}

.rightside {
  right: 0;
}

.contact_link {
  display: flex;
    position: absolute;
    bottom: 24px;
    left: 24px;
    gap: 16px;
    align-items: center;
}


@media only screen and (max-width: 700px) {
  .hello_txt {
    font-size: 8px;
  }

  .name_txt {
    font-size: 24px;
  }

  .deg_txt {
    font-size: 12px;
  }

  .details {
    width: 200px;
  }

  .ak_img {
    height: 54%;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      /* transform: translateX(50%); */
      transform: translate(-50%, -125%);
    }

    100% {
      opacity: 1;
      transform: translate(-50%, -115%)
        /* transform: translateX(-50%); */
    }
  }
}
</style>
