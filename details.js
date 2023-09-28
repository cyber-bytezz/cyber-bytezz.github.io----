document.addEventListener("DOMContentLoaded", function () {
    // Get the student ID from the URL parameter 
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = parseInt(urlParams.get("id"));

    // Fetch student data 
    fetch("student_data.json")
        .then(response => response.json())
        .then(data => {
            const student = data.find(item => item.id === studentId);
            console.log("Found student:", student);
            if (student) {
                displayStudentDetails(student);
                renderExtracurricularLink(student.id);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

function displayStudentDetails(student) {
    const studentInfo = document.querySelector(".student-info");
    studentInfo.innerHTML = `
        <div class="student-photo">
            <img src="${student.image}" alt="${student.name} Photo">
        </div>
        <div class="student-details">
            <h2>${student.name}</h2>
            <p>Education: ${student.education}</p>
            <p>Academic Performance: ${student["Academic Performance}"]}</p>
            <p>Skills: ${student.skills}</p>
            <p>Semester 1 GPA: ${student.Semester1}</p>
            <p>Semester 2 GPA: ${student.Semester2}</p>
            <p>Semester 3 GPA: ${student.Semester3}</p>
            <p>Semester 4 GPA: ${student.Semester4}</p>
            <p>Semester 5 GPA: ${student.Semester5}</p>
            <p>Semester 6 GPA: ${student.Semester6}</p>
            <p>Semester 7 GPA: ${student.Semester7}</p>
            <p>Semester 8 GPA: ${student.Semester8}</p>
            <p>10th Percentage: ${student["10th_percentage"]}</p>
            <p>12th Percentage: ${student["12th_percentage"]}</p>
            <p>Contact: ${student.contact}</p>
            
            <br>
            <a href="extracurricular.html?id=${student.id}" class="extracurricular-link">Extracurricular Activities</a>
        </div>
    `;

    const certificatesList = document.querySelector(".certificates-list");
    certificatesList.innerHTML = "";

    // Adding certification images and names
    for (const cert of student.certifications) {
        const certDiv = document.createElement("div");
        certDiv.classList.add("certification");

        const certImage = document.createElement("img");
        certImage.src = cert.image;
        certImage.alt = `${cert.name} Certification`;

        // Add click event listener to open the image in a new tab
        certImage.addEventListener("click", () => {
            openImageInNewTab(cert.image);
        });

        const certName = document.createElement("p");
        certName.textContent = cert.name;

        certDiv.appendChild(certImage);
        certDiv.appendChild(certName);
        certificatesList.appendChild(certDiv);
    }
}

function openImageInNewTab(imageUrl) {
    window.open(imageUrl, "_blank");
}

function renderExtracurricularLink(studentId) {
    const extracurricularLink = document.getElementById("extracurricularLink");
    extracurricularLink.href = `extracurricular.html?id=${studentId}`;
}
