const hoverSound =
    new Audio(
        "/sounds/hover.mp3"
    );

const clickSound =
    new Audio(
        "/sounds/click.mp3"
    );

document
    .querySelectorAll(
        "button, a, .glass-card"
    )

    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                hoverSound.volume = 0.15;

                hoverSound.currentTime = 0;

                hoverSound.play()
                    .catch(() => {});

            }
        );

        element.addEventListener(
            "click",
            () => {

                clickSound.volume = 0.2;

                clickSound.currentTime = 0;

                clickSound.play()
                    .catch(() => {});

            }
        );

    });