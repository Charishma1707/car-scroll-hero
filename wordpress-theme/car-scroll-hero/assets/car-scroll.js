/* WordPress Car Scroll Hero GSAP Engine */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const carWrapper = document.getElementById('wpCar');
    const trail = document.getElementById('wpTrail');
    const chars = gsap.utils.toArray('.wp-char');
    const trackPct = document.getElementById('wpTrackPct');
    const speedVal = document.getElementById('wpSpeedVal');

    if (!carWrapper) return;

    let maxTravel = window.innerWidth - 190;
    function updateBounds() {
        maxTravel = window.innerWidth - 190;
    }
    window.addEventListener('resize', updateBounds);
    updateBounds();

    ScrollTrigger.create({
        trigger: '#wpScrollArea',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: function (self) {
            const progress = self.progress;
            const currentX = progress * maxTravel;

            gsap.set(carWrapper, { x: currentX });
            if (trail) {
                gsap.set(trail, { width: currentX + 85 });
            }

            if (trackPct) {
                trackPct.textContent = Math.round(progress * 100) + '%';
            }

            if (speedVal) {
                const velocity = Math.abs(self.getVelocity());
                const speed = Math.min(340, Math.round(velocity * 0.12));
                speedVal.textContent = speed + ' KM/H';
            }

            const carCenter = currentX + 90;
            chars.forEach(function (char) {
                const rect = char.getBoundingClientRect();
                if (carCenter >= rect.left) {
                    char.classList.add('active');
                } else {
                    char.classList.remove('active');
                }
            });
        }
    });
});
