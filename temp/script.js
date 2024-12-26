// Create the chart when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the context of the canvas element
    const ctx = document.getElementById('birthdayChart').getContext('2d');

    // Define the data for the doughnut chart
    const data = {
        labels: ['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5'],
        datasets: [{
            data: [20, 30, 25, 15, 10], // Customize the data
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162,235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };

    // Define options for the chart
    const options = {
        responsive: true, // Make the chart responsive
        maintainAspectRatio: false
    };

    // Create a doughnut chart
    const birthdayChart = new Chart(ctx, {
        type: 'doughnut', // Change the type to 'doughnut'
        data: data,
        options: options
    });
});
