document.addEventListener("DOMContentLoaded", function () {
    // Get the student ID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = parseInt(urlParams.get("id"));

    // Fetch student data
    fetch("student_data.json")
        .then(response => response.json())
        .then(data => {
            const student = data.find(item => item.id === studentId);
            if (student) {
                displayExtracurricularActivities(student);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

function displayExtracurricularActivities(student) {
    const activitiesList = document.querySelector(".activities-list");
    activitiesList.innerHTML = "";

    // Display extracurricular activities
    for (const activity of student.extracurricularActivities) {
        const activityDiv = document.createElement("div");
        activityDiv.classList.add("activity");

        const activityName = document.createElement("p");
        activityName.textContent = activity.name;

        const activityDescription = document.createElement("p");
        activityDescription.textContent = activity.description;

        activityDiv.appendChild(activityName);
        activityDiv.appendChild(activityDescription);
        activitiesList.appendChild(activityDiv);
    }
}
