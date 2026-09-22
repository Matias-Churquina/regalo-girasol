import "./style.css";

import gsap from "gsap";

import { MotionPathPlugin }
    from "gsap/MotionPathPlugin";

import confetti
    from "canvas-confetti";


gsap.registerPlugin(
    MotionPathPlugin
);

/* =========================================
   CONFIGURACIÓN DEL ENVÍO
========================================= */

const shipment = {

    trackingNumber: "0001416441804MXGL4X1901",

    // Progreso visual del viaje
    // 0.00 = Jujuy
    // 1.00 = Chamical
    progress: 0.22,

    status: "EN PAQUETERÍA",

    message:
        "Tu regalo se está preparando para viajar 💛"

};


/* =========================================
   ELEMENTOS
========================================= */

const intro = document.querySelector("#intro");

const flowerScene =
  document.querySelector("#flowerScene");

const giftScene =
  document.querySelector("#giftScene");


const startButton =
  document.querySelector("#startButton");

const trackingButton =
  document.querySelector("#trackingButton");


const stem =
  document.querySelector("#stem");

const leafLeft =
  document.querySelector("#leafLeft");

const leafRight =
  document.querySelector("#leafRight");

const flowerHead =
  document.querySelector("#flowerHead");

const petals =
  document.querySelector("#petals");


const growthMessage =
  document.querySelector("#growthMessage");

const progressNumber =
  document.querySelector("#progressNumber");

const instruction =
  document.querySelector("#instruction");

const tapIndicator =
  document.querySelector("#tapIndicator");

const backgroundMusic =
    document.querySelector("#backgroundMusic");

const musicButton =
    document.querySelector("#musicButton");

let musicPlaying = false;

const petalContainer =
    document.querySelector("#petalContainer");

const memoryMessages =
    document.querySelector("#memoryMessages");

const travelScene =
    document.querySelector("#travelScene");

const packageElement =
    document.querySelector("#package");

const routePath =
    document.querySelector("#routePath");

const shippingStatus =
    document.querySelector("#shippingStatus");

const officialTrackingButton =
    document.querySelector("#officialTrackingButton");

const trackingCode =
    document.querySelector("#trackingCode");

const copyTrackingButton =
    document.querySelector("#copyTrackingButton");

const copyMessage =
    document.querySelector("#copyMessage");


trackingCode.textContent =
    shipment.trackingNumber;

/* =========================================
   FRASES
========================================= */

const messages = [

    "Tremenda sonrisita...",

    "Tremendos ojitos...",

    "Tremendo cabello...",

    "Tremenda persona...",

    "Tremenda forma de ser...",

    "Y un tremendo corazón 💛"

];

const finalMessagePositions = [

    {
        top: "18%",
        left: "7%",
        rotation: -8
    },

    {
        top: "25%",
        right: "6%",
        rotation: 7
    },

    {
        top: "44%",
        left: "4%",
        rotation: -5
    },

    {
        top: "48%",
        right: "5%",
        rotation: 6
    },

    {
        top: "64%",
        left: "8%",
        rotation: -4
    },

    {
        top: "68%",
        right: "5%",
        rotation: 5
    }

];


let growth = 0;

let canGrow = true;


/* =========================================
   ESTADO INICIAL DEL GIRASOL
========================================= */

gsap.set(stem, {

  scaleY: 0,

  transformOrigin: "bottom center"

});


gsap.set(
  [leafLeft, leafRight],
  {

    scale: 0,

    opacity: 0,

    transformOrigin: "center"

  }
);


gsap.set(flowerHead, {

  scale: 0,

  opacity: 0,

  transformOrigin: "center"

});


/* =========================================
   ANIMACIÓN PORTADA
========================================= */

gsap.from(".intro-content > *", {

  y: 25,

  opacity: 0,

  duration: 1,

  stagger: .18,

  ease: "power3.out"

});


gsap.to("#startButton span", {

  y: 6,

  duration: .7,

  repeat: -1,

  yoyo: true,

  ease: "power1.inOut"

});


/* =========================================
   INICIAR EXPERIENCIA
========================================= */

startButton.addEventListener(
  "click",
  startExperience
);


function startExperience() {

    startMusic();

    gsap.to(intro, {

        opacity: 0,

        scale: 1.05,

        duration: .8,

        ease: "power2.inOut",

        onComplete: () => {

            intro.classList.remove(
                "scene-active"
            );

            flowerScene.classList.add(
                "scene-active"
            );

            createPetals();

            gsap.fromTo(
                flowerScene,
                {
                    opacity: 0
                },
                {
                    opacity: 1,
                    duration: 1
                }
            );

            gsap.from(
                "#pot",
                {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "back.out(1.7)"
                }
            );

        }

    });

}


/* =========================================
   CRECIMIENTO
========================================= */

flowerScene.addEventListener(
  "click",
  growFlower
);


function growFlower(event) {

  /*
    Evitamos que un toque durante
    una animación dispare varias etapas.
  */

  if (!canGrow) return;

  if (growth >= messages.length) return;


  canGrow = false;

  growth++;


  progressNumber.textContent = growth;


  showMessage(
    messages[growth - 1]
  );


  animateGrowth(growth);


  setTimeout(() => {

    canGrow = true;

  }, 650);

}


/* =========================================
   MOSTRAR FRASE
========================================= */

function showMessage(message) {

    growthMessage.textContent = message;


    gsap.killTweensOf(
        growthMessage
    );


    gsap.fromTo(

        growthMessage,

        {
            opacity: 0,
            y: 25,
            scale: .85
        },

        {
            opacity: 1,
            y: 0,
            scale: 1,

            duration: .6,

            ease: "back.out(1.7)"
        }

    );


    /*
       Después de unos segundos
       desaparece suavemente.
    */

    gsap.to(
        growthMessage,
        {

            opacity: 0,

            y: -15,

            delay: 1.7,

            duration: .7

        }
    );

}

function showAllMessages() {

    memoryMessages.innerHTML = "";


    messages.forEach(
        (message, index) => {

            const element =
                document.createElement("span");


            element.classList.add(
                "memory-message"
            );


            element.textContent =
                message;


            const position =
                finalMessagePositions[index];


            if (position.top) {
                element.style.top =
                    position.top;
            }


            if (position.left) {
                element.style.left =
                    position.left;
            }


            if (position.right) {
                element.style.right =
                    position.right;
            }


            element.style.transform =
                `rotate(${position.rotation}deg)`;


            memoryMessages.appendChild(
                element
            );


            gsap.fromTo(

                element,

                {
                    opacity: 0,
                    scale: .7,
                    y: 15
                },

                {
                    opacity: .65,
                    scale: 1,
                    y: 0,

                    duration: .8,

                    delay:
                        index * .18,

                    ease:
                        "back.out(1.7)"
                }

            );

        }
    );

}

/* =========================================
   ETAPAS DE CRECIMIENTO
========================================= */

function animateGrowth(level) {

  switch (level) {


    /* -------------------------
       ETAPA 1
    ------------------------- */

    case 1:

      gsap.to(stem, {

        scaleY: .25,

        duration: .8,

        ease: "power2.out"

      });

      break;


    /* -------------------------
       ETAPA 2
    ------------------------- */

    case 2:

      gsap.to(stem, {

        scaleY: .45,

        duration: .8,

        ease: "power2.out"

      });


      gsap.to(leafLeft, {

        scale: .65,

        opacity: 1,

        duration: .7,

        ease: "back.out(2)"

      });

      break;


    /* -------------------------
       ETAPA 3
    ------------------------- */

    case 3:

      gsap.to(stem, {

        scaleY: .65,

        duration: .8

      });


      gsap.to(leafLeft, {

        scale: 1,

        duration: .5

      });

      break;


    /* -------------------------
       ETAPA 4
    ------------------------- */

    case 4:

      gsap.to(stem, {

        scaleY: .85,

        duration: .8

      });


      gsap.to(leafRight, {

        scale: .8,

        opacity: 1,

        duration: .7,

        ease: "back.out(2)"

      });

      break;


    /* -------------------------
       ETAPA 5
    ------------------------- */

    case 5:

      gsap.to(stem, {

        scaleY: 1,

        duration: .8

      });


      gsap.to(leafRight, {

        scale: 1,

        duration: .5

      });


      gsap.to(flowerHead, {

        scale: .4,

        opacity: 1,

        duration: .7,

        ease: "back.out(2)"

      });

      break;


    /* -------------------------
       ETAPA FINAL
    ------------------------- */

    case 6:

      bloomFlower();

      break;

  }

}


/* =========================================
   ABRIR GIRASOL
========================================= */

function bloomFlower() {

  instruction.textContent =
    "Mirá lo que hiciste crecer 🌻";


  gsap.to(tapIndicator, {

    opacity: 0,

    duration: .4

  });


  const timeline =
    gsap.timeline();


  timeline

    .to(
      flowerHead,
      {

        scale: 1,

        opacity: 1,

        duration: 1.2,

        ease: "elastic.out(1, .5)"

      }
    )


    .fromTo(

      "#petals ellipse",

      {

        scale: 0,

        transformOrigin: "center"

      },

      {

        scale: 1,

        duration: .8,

        stagger: .08,

        ease: "back.out(2)"

      },

      "-=.7"

    )

    .call(
      showAllMessages
    )

    .to(

      flowerHead,

      {

        rotation: 3,

        duration: 1,

        yoyo: true,

        repeat: 1,

        transformOrigin: "center"

      }

    )

    .call(
      launchConfetti
    )


    .call(
      showGift,
      null,
      "+=2.5"
    );

  gsap.to(
    flowerHead,
    {

        scale: 1.035,

        duration: 2.2,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut",

        delay: 2

    }
);

}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {

  confetti({

    particleCount: 80,

    spread: 80,

    origin: {

      y: .55

    }

  });

}


/* =========================================
   CAMBIAR A REGALO
========================================= */

function showGift() {

  gsap.to(
    flowerScene,
    {

      opacity: 0,

      duration: 1,

      onComplete: () => {

        flowerScene.classList.remove(
          "scene-active"
        );


        giftScene.classList.add(
          "scene-active"
        );


        gsap.fromTo(

          giftScene,

          {
            opacity: 0
          },

          {
            opacity: 1,
            duration: 1
          }

        );


        gsap.from(
          ".gift-content > *",
          {

            y: 30,

            opacity: 0,

            duration: .8,

            stagger: .15,

            ease: "power3.out"

          }
        );

      }

    }
  );

}


/* =========================================
   TRACKING
========================================= */

trackingButton.addEventListener(
  "click",
  showTravelScene
);

function showTravelScene() {

    gsap.to(
        giftScene,
        {

            opacity: 0,

            scale: .97,

            duration: .7,

            ease: "power2.inOut",

            onComplete: () => {

                giftScene.classList.remove(
                    "scene-active"
                );


                travelScene.classList.add(
                    "scene-active"
                );


                gsap.fromTo(
                    travelScene,
                    {
                        opacity: 0
                    },
                    {
                        opacity: 1,

                        duration: .8,

                        onComplete:
                            startTravelAnimation
                    }
                );

            }

        }
    );

}

function startTravelAnimation() {

    /*
     * Calculamos la longitud real
     * del camino SVG.
     */

    const routeLength =
        routePath.getTotalLength();


    /*
     * Ocultamos inicialmente
     * la ruta amarilla.
     */

    gsap.set(
        routePath,
        {

            strokeDasharray:
                routeLength,

            strokeDashoffset:
                routeLength * (1 - shipment.progress)

        }
    );

    gsap.set(
        packageElement,
        {
            transformOrigin: "50% 50%"
        }
    );


    gsap.set(
        shippingStatus,
        {

            opacity: 0,

            y: 20

        }
    );


    /*
     * Timeline general.
     */

    const travelTimeline =
        gsap.timeline();


    travelTimeline


        /* Header */

        .from(
            ".travel-header > *",
            {

                opacity: 0,

                y: 20,

                stagger: .12,

                duration: .7

            }
        )


        /* Puntos */

        .from(
            ".location-dot",
            {

                scale: 0,

                transformOrigin:
                    "center",

                stagger: .3,

                duration: .6,

                ease:
                    "back.out(2)"

            }
        )


        /* Ruta */

        .to(
            routePath,
            {

                strokeDashoffset: 
                    routeLength * .28,

                duration: 5,

                ease:
                    "power1.inOut"

            }
        )


        /* Estado */

        .to(
            shippingStatus,
            {

                opacity: 1,

                y: 0,

                duration: .8,

                ease:
                    "power2.out"

            },

            "-=.5"
        );


    /*
     * El paquete sigue exactamente
     * la misma ruta.
     */
    gsap.to(
        packageElement,
        {
            duration: 5,

            ease: "power1.inOut",

            motionPath: {
                path: routePath,

                align: routePath,

                alignOrigin: [
                    0.5,
                    0.5
                ],

                autoRotate: false,

                start: 0,

                end: shipment.progress
            },

            delay: 1.5,

            onComplete: () => {

                gsap.to(
                    packageElement,
                    {
                        scale: 1.06,

                        duration: 1,

                        repeat: -1,

                        yoyo: true,

                        ease: "sine.inOut"
                    }
                );

            }
        }
    );

}

officialTrackingButton.addEventListener(
    "click",
    () => {

        window.open(
            "https://www.correoargentino.com.ar/formularios/e-commerce",
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* =========================================
    MÚSICA
========================================= */
async function startMusic() {

    try {

        backgroundMusic.volume = 0;

        await backgroundMusic.play();

        musicPlaying = true;

        musicButton.classList.add("playing");
        musicButton.textContent = "♫";


        // Fade-in suave
        gsap.to(backgroundMusic, {
            volume: 0.25,
            duration: 3
        });

    } catch (error) {

        console.log(
            "El navegador bloqueó la reproducción:",
            error
        );

    }

}

musicButton.addEventListener("click", async (event) => {

    event.stopPropagation();

    if (musicPlaying) {

        gsap.to(backgroundMusic, {

            volume: 0,

            duration: .5,

            onComplete: () => {

                backgroundMusic.pause();

                musicPlaying = false;

                musicButton.classList.remove("playing");

                musicButton.textContent = "♪";

            }

        });

    } else {

        await backgroundMusic.play();

        musicPlaying = true;

        musicButton.classList.add("playing");

        musicButton.textContent = "♫";

        gsap.to(backgroundMusic, {
            volume: .25,
            duration: .8
        });

    }

});


/* =========================================
    PÉTALOS AMBIENTALES
========================================= */
function createPetals() {

    const totalPetals = 16;

    for (let i = 0; i < totalPetals; i++) {

        const petal =
            document.createElement("span");

        petal.classList.add(
            "falling-petal"
        );

        petalContainer.appendChild(
            petal
        );


        const startX =
            Math.random() * 100;


        const duration =
            7 + Math.random() * 7;


        const delay =
            Math.random() * 8;


        const horizontalMovement =
            -40 + Math.random() * 80;


        gsap.set(petal, {

            left: `${startX}%`,

            rotation:
                Math.random() * 360,

            scale:
                .5 + Math.random() * .7

        });


        gsap.to(petal, {

            y:
                window.innerHeight + 100,

            x:
                horizontalMovement,

            rotation:
                `+=${180 + Math.random() * 360}`,

            opacity: .55,

            duration: duration,

            delay: delay,

            repeat: -1,

            ease: "none",

            repeatRefresh: true

        });

    }

}

/* =========================================
   COPIAR CÓDIGO DE SEGUIMIENTO
========================================= */
copyTrackingButton.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                shipment.trackingNumber
            );

            copyTrackingButton.textContent =
                "✓";

            gsap.to(
                copyMessage,
                {
                    opacity: 1,
                    duration: .3
                }
            );


            setTimeout(() => {

                copyTrackingButton.textContent =
                    "Copiar";

                gsap.to(
                    copyMessage,
                    {
                        opacity: 0,
                        duration: .3
                    }
                );

            }, 1800);

        } catch (error) {

            console.error(
                "No se pudo copiar:",
                error
            );

        }

    }
);