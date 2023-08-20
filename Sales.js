document.addEventListener("DOMContentLoaded", function() {
    const dataTable = document.getElementById("data-table");

    fetch("Final.csv")
        .then(response => response.text())
        .then(csvData => {
            const rows = csvData.split("\n");
            const tableHTML = "<table>" + rows.map(row => {
                const cells = row.split(",");
                return "<tr>" + cells.map(cell => `<td>${cell}</td>`).join("") + "</tr>";
            }).join("") + "</table>";

            dataTable.innerHTML = tableHTML;
        })
        .catch(error => {
            console.error("Error fetching CSV data:", error);
            dataTable.textContent = "Error fetching CSV data.";
        });
});
