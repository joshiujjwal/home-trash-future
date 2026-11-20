(() => {
  const svgNS = "http://www.w3.org/2000/svg";
  const itemsLayer = document.getElementById("items-layer");
  const toggleBtn = document.getElementById("toggle-play");
  const statTotal = document.getElementById("stat-total");
  const statDiverted = document.getElementById("stat-diverted");

  if (!itemsLayer || !toggleBtn) return;

  const inletPaths = [
    document.getElementById("pipe-kitchen"),
    document.getElementById("pipe-bath"),
    document.getElementById("pipe-office"),
  ];

  const outletPaths = {
    organic: { path: document.getElementById("pipe-compost"), color: "#22c55e" },
    recycle: { path: document.getElementById("pipe-recycle"), color: "#3b82f6" },
    landfill: { path: document.getElementById("pipe-landfill"), color: "#94a3b8" },
  };

  let running = true;
  let totalCount = 0;
  let divertedCount = 0;
  const activeItems = [];

  function spawnItem(kind) {
    const inlet =
      kind === "organic"
        ? inletPaths[0]
        : inletPaths[Math.floor(Math.random() * inletPaths.length)];
    const outlet = outletPaths[kind];
    if (!inlet || !outlet || !outlet.path) return;

    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("r", "7");
    circle.setAttribute("fill", outlet.color);
    circle.setAttribute("stroke", "#0f172a");
    circle.setAttribute("stroke-width", "2");
    itemsLayer.appendChild(circle);

    activeItems.push({
      el: circle,
      kind,
      stage: "inlet",
      progress: 0,
      inlet,
      outlet: outlet.path,
    });
  }

  function updateStats(kind) {
    totalCount += 1;
    if (kind === "organic" || kind === "recycle") {
      divertedCount += 1;
    }
    statTotal.textContent = String(totalCount);
    statDiverted.textContent = `${Math.round((divertedCount / totalCount) * 100)}%`;
  }

  let lastTime = performance.now();
  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    if (running) {
      for (let i = activeItems.length - 1; i >= 0; i -= 1) {
        const item = activeItems[i];
        item.progress += dt * 0.75;

        if (item.stage === "inlet") {
          const len = item.inlet.getTotalLength();
          if (item.progress >= 1) {
            item.stage = "outlet";
            item.progress = 0;
          } else {
            const pt = item.inlet.getPointAtLength(item.progress * len);
            item.el.setAttribute("cx", pt.x.toFixed(1));
            item.el.setAttribute("cy", pt.y.toFixed(1));
          }
        } else {
          const len = item.outlet.getTotalLength();
          if (item.progress >= 1) {
            item.el.remove();
            activeItems.splice(i, 1);
            updateStats(item.kind);
          } else {
            const pt = item.outlet.getPointAtLength(item.progress * len);
            item.el.setAttribute("cx", pt.x.toFixed(1));
            item.el.setAttribute("cy", pt.y.toFixed(1));
          }
        }
      }
    }

    requestAnimationFrame(tick);
  }

  toggleBtn.addEventListener("click", () => {
    running = !running;
    toggleBtn.textContent = running ? "Pause" : "Play";
  });

  document.getElementById("drop-organic")?.addEventListener("click", () => spawnItem("organic"));
  document.getElementById("drop-recycle")?.addEventListener("click", () => spawnItem("recycle"));
  document.getElementById("drop-landfill")?.addEventListener("click", () => spawnItem("landfill"));

  // Auto-spawn demo items periodically
  const kinds = ["organic", "recycle", "landfill"];
  spawnItem("organic");
  setInterval(() => {
    if (running && activeItems.length < 12) {
      const next = kinds[Math.floor(Math.random() * kinds.length)];
      spawnItem(next);
    }
  }, 1500);

  requestAnimationFrame(tick);
})();
