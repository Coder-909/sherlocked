const background = document.querySelector('.background');
    let timeoutId = null;
    let lastX = 0, lastY = 0, lastTime = Date.now();
    
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = Date.now();

      const dx = x - lastX;
      const dy = y - lastY;
      const dt = now - lastTime;

      const speed = Math.sqrt(dx * dx + dy * dy) / dt;

      // Reduced intensity for less dimming (0.5 instead of 1)
      const intensity = Math.min(speed * 4, 0.5); // Reduced multiplier and max intensity

      // Calculate brightness-adjusted center color
      const baseColor = [94, 66, 44];   // #5e422c
      const brightColor = [201, 142, 83]; // #c98e53

      const blended = baseColor.map((val, i) =>
        Math.round(val + (brightColor[i] - val) * intensity)
      );

      const colorHex = `rgb(${blended.join(',')})`;

      // Smaller highlight area (80px instead of 120px)
      background.style.background = `radial-gradient(circle at ${x}px ${y}px, ${colorHex} 60px,rgb(31, 20, 10) 130px)`;

      lastX = x;
      lastY = y;
      lastTime = now;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        background.style.background = 'radial-gradient(circle at center,rgb(54, 41, 29) 0%,rgb(35, 24, 15) 100%)';
      }, 300); // Shorter timeout for quicker reset
    });