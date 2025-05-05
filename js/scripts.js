document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const downloadBtn = document.getElementById("downloadBtn");
  const canvas = document.getElementById("barChart");
  const ctx = canvas.getContext("2d");

  // Username validation
  usernameInput?.addEventListener("change", () => {
    const username = usernameInput.value;
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    usernameInput.style.borderColor = regex.test(username) ? "green" : "red";

    if (!regex.test(username)) {
      alert(
        "Username must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      );
    }
  });

  // Download chart as image
  downloadBtn?.addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "Chart.png";
    link.click();
  });

  // Get monthly data
  const getMonthlyData = () => {
    const months = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ];

    return months.map((month) => {
      const income =
        parseFloat(document.getElementById(`${month}-income`)?.value) || 0;
      const expenses =
        parseFloat(document.getElementById(`${month}-expenses`)?.value) || 0;

      return {
        month: `${month.charAt(0).toUpperCase()}${month.slice(1)}`,
        income,
        expenses,
      };
    });
  };

  // Initialize the bar chart
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Income",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Income vs Expenses",
        },
      },
    },
  });

  // Update chart data dynamically
  const updateChartData = () => {
    const monthlyData = getMonthlyData();
    chart.data.datasets[0].data = monthlyData.map((entry) => entry.income);
    chart.data.datasets[1].data = monthlyData.map((entry) => entry.expenses);
    chart.update();
  };

  // Update chart on page load
  updateChartData();

  // Add event listeners to update chart on input changes
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateChartData);
  });
});
