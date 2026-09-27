document.addEventListener("DOMContentLoaded", function () {
  const trendCanvas = document.getElementById("trendChart");
  if (trendCanvas && typeof trendLabels !== "undefined") {
    new Chart(trendCanvas, {
      type: "line",
      data: {
        labels: trendLabels,
        datasets: [
          {
            label: "Income",
            data: trendIncome,
            borderColor: "#16a34a",
            backgroundColor: "rgba(22,163,74,0.08)",
            tension: 0.35,
            fill: true,
          },
          {
            label: "Expenses",
            data: trendExpense,
            borderColor: "#dc2626",
            backgroundColor: "rgba(220,38,38,0.08)",
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
        scales: { y: { beginAtZero: true } },
      },
    });
  }

  const catCanvas = document.getElementById("categoryChart");
  if (catCanvas && typeof catLabels !== "undefined" && catLabels.length) {
    new Chart(catCanvas, {
      type: "doughnut",
      data: {
        labels: catLabels,
        datasets: [
          {
            data: catValues,
            backgroundColor: [
              "#1d4ed8", "#0ea5e9", "#16a34a", "#d97706",
              "#dc2626", "#7c3aed", "#0891b2", "#64748b",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom" } },
      },
    });
  }
});
