
        // Load existing entries from local storage when the page is loaded


        window.onload = function() {
            const storedEntries = JSON.parse(localStorage.getItem('students')) || [];
            storedEntries.forEach(entry => {
                displayEntry(entry);
            });
        };

            // The Above functionality used to keep the registered entry on the same page even
            // after refreshing the page


        // Add event listener to handle form submission


        document.getElementById('myForm').addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission



            // Geting form values from the HTML file

            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const age = document.getElementById('age').value;
            const address = document.getElementById('address').value;
            const phone = document.getElementById('phone').value;

            // Create a new student entry object
            
            const newEntry = {
                id: Date.now(), // Unique ID for each entry
                name: name,
                email: email,
                age: age,
                address: address,
                phone: phone
            };

            // Get existing entries from local storage
            const existingEntries = JSON.parse(localStorage.getItem('students')) || [];
            // Add the new entry to the list of entries
            existingEntries.push(newEntry);
            // Save the updated entries back to local storage
            localStorage.setItem('students', JSON.stringify(existingEntries));

            // Display the new entry
            displayEntry(newEntry);

            // Clear the form fields
            document.getElementById('myForm').reset();
        });

        // Function to display a student entry
        function displayEntry(entry) {
            const detailsContent = document.getElementById('details-content');

            const entryDiv = document.createElement('div');
            entryDiv.className = 'detail';
            entryDiv.id = `entry-${entry.id}`;

            entryDiv.innerHTML = `
                <div>
                    <strong>Name:</strong> ${entry.name}<br>
                    <strong>Email:</strong> ${entry.email}<br>
                    <strong>Age:</strong> ${entry.age}<br>
                    <strong>Address:</strong> ${entry.address}<br>
                    <strong>Phone:</strong> ${entry.phone}
                </div>
                <button class="delete-button" onclick="deleteEntry(${entry.id})">Delete</button>
            `;

            detailsContent.appendChild(entryDiv);

            // Show the form details section
            document.getElementById('form-details').style.display = 'block';
        }

        // Function to delete a student entry

        
        function deleteEntry(entryId) {

            // Remove the entry from the displayed list
            const entry = document.getElementById(`entry-${entryId}`);
            if (entry) {
                entry.remove();
            }


            // Remove the entry from local storage


            let existingEntries = JSON.parse(localStorage.getItem('students')) || [];
            existingEntries = existingEntries.filter(entry => entry.id !== entryId);
            localStorage.setItem('students', JSON.stringify(existingEntries));


            // Hide the form details section if no entries are left

            const detailsContent = document.getElementById('details-content');
            if (detailsContent.children.length === 0) {
                document.getElementById('form-details').style.display = 'none';
            }
        }