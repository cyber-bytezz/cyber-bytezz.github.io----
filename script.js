document.addEventListener("DOMContentLoaded", function () {
    const studentsPerPage = 15;
    let studentData = []; // Initialize an empty array to hold student data

    const studentGrid = document.querySelector(".student-grid");
    const pagination = document.querySelector(".pagination");
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    function generateStudentCards(page, data) {
        studentGrid.innerHTML = ""; 
        const startIndex = (page - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;

        for (let i = startIndex; i < endIndex && i < data.length; i++) {
            const student = data[i];
            const studentCard = document.createElement("a");
            studentCard.href = `details.html?id=${student.id}`;
            studentCard.classList.add("student-card");
            studentCard.innerHTML = `
                <img src="${student.image}" alt="${student.name}">
                <h3>${student.name}</h3>
                <p>Contact: ${student.contact}</p>
            `;
            studentGrid.appendChild(studentCard);
        }
    }

    function generatePaginationLinks(totalPages) {
        pagination.innerHTML = ""; 

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.classList.add("page-link");
            pageLink.textContent = i;
            pageLink.href = "#";

            (function (pageNumber) {
                pageLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    generateStudentCards(pageNumber, studentData);
                });
            })(i);

            pagination.appendChild(pageLink);
        }
    }

    fetch("student_data.json")
        .then(response => response.json())
        .then(data => {
            studentData = data; // Store the fetched data in the variable
            const totalPages = Math.ceil(data.length / studentsPerPage);
            generateStudentCards(1, studentData);
            generatePaginationLinks(totalPages);
        })
        .catch(error => console.error("Error fetching data:", error));



        // search container

        searchButton.addEventListener("click", function () {
            const searchTerm = searchInput.value.toLowerCase();
            filteredStudentData = studentData.filter(student =>
                student.name.toLowerCase().includes(searchTerm)
            );
            const totalPages = Math.ceil(filteredStudentData.length / studentsPerPage);
            generateStudentCards(1, filteredStudentData);
            generatePaginationLinks(totalPages);
        });





    });
