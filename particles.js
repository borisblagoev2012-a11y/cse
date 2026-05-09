const particlesContainer =
    document.querySelector(".particles");

for (let i = 0; i < 40; i++) {

    const particle =
        document.createElement("div");

    particle.className =
        "particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        5 + Math.random() * 10 + "s";

    particle.style.opacity =
        Math.random();

    particle.style.width =
        particle.style.height =
        Math.random() * 4 + 2 + "px";

    particlesContainer?.appendChild(
        particle
    );

}