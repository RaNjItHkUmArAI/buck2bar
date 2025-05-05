document.addEventListener("DOMContentLoaded", function () {
  //input with id "username" on change
  document.getElementById("username").addEventListener("change", function () {
    const username = document.getElementById("username").value;
    //regex to check if username has atleast 1 capital letter, 1 special character, 1 number and is atleast 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(username)) {
      //set the username input border to green
      document.getElementById("username").style.borderColor = "green";
    } else {
      //set the username input border to red
      document.getElementById("username").style.borderColor = "red";
      // alert(
      //   "Username must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
      // );
    }
  });

  document.getElementById("downloadBtn").addEventListener("click", function () {
    const canvas = document.getElementById("barChart");
    const image = canvas.toDataURL("image/png");

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = image;
    link.download = "Chart.png"; // File name for the downloaded image

    // Trigger the download
    link.click();
  });

  const ctx = document.getElementById("barChart").getContext("2d");

  function getMonthlyData() {
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

    const data = months.map((month) => {
      const incomeInput = document.getElementById(`${month}-income`);
      const expensesInput = document.getElementById(`${month}-expenses`);

      return {
        month: month.charAt(0).toUpperCase() + month.slice(1),
        income: incomeInput ? parseFloat(incomeInput.value) || 0 : 0,
        expenses: expensesInput ? parseFloat(expensesInput.value) || 0 : 0,
      };
    });

    return data;
  }

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
          data: [], // Will be dynamically set
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: [], // Will be dynamically set
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

  // Update the chart data dynamically
  function updateChartData() {
    const monthlyData = getMonthlyData();

    // Extract income and expenses data
    const incomeData = monthlyData.map((entry) => entry.income);
    const expensesData = monthlyData.map((entry) => entry.expenses);

    // Update the chart datasets
    chart.data.datasets[0].data = incomeData;
    chart.data.datasets[1].data = expensesData;

    // Refresh the chart
    chart.update();
  }

  // Update the chart when the page loads
  updateChartData();

  // Optionally, you can add event listeners to update the chart when inputs change
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateChartData);
  });
});
