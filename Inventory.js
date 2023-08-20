// script.js

document.addEventListener('DOMContentLoaded', function () {
    const inventoryButton = document.querySelector('#inventory-button');
    const inventoryTable = document.getElementById('inventory-table');

    inventoryButton.addEventListener('click', function () {
        salesSection.style.display = 'none';
        inventorySection.style.display = 'block';
        scheduleSection.style.display = 'none';

        fetch('Inventory.csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n');
                const headers = rows[0].split(',');

                if (headers[0].toLowerCase() !== 'item' || headers[1].toLowerCase() !== 'quantity') {
                    console.error('Invalid CSV format: Columns should be "Item" and "Quantity".');
                    return;
                }

                let tableHTML = '<thead><tr>';
                for (const header of headers) {
                    tableHTML += `<th>${header}</th>`;
                }
                tableHTML += '</tr></thead><tbody>';

                for (let i = 1; i < rows.length; i++) {
                    const cells = rows[i].split(',');
                    tableHTML += '<tr>';
                    for (const cell of cells) {
                        tableHTML += `<td>${cell}</td>`;
                    }
                    tableHTML += '</tr>';
                }

                tableHTML += '</tbody>';
                inventoryTable.innerHTML = tableHTML;
            })
            .catch(error => {
                console.error('Error loading inventory data:', error);
            });
    });
});
