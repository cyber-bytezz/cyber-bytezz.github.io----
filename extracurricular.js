document.addEventListener("DOMContentLoaded", function () {
    // Get the student ID from the URL parameter (replace with your actual logic)
    const urlParams = new URLSearchParams(window.location.search);
    const studentId = parseInt(urlParams.get("id"));

    fetch("student_data.json")
        .then(response => response.json())
        .then(data => {
            const student = data.find(item => item.id === studentId);
            if (student) {
                displayExtracurricularActivities(student.extracurricularActivities);
                renderExtracurricularLink(student.id);
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});

function displayExtracurricularActivities(activities) {
    const extracurricularActivitiesSection = document.querySelector(".extracurricular-activities");
    extracurricularActivitiesSection.innerHTML = `
        <h2>Extracurricular Activities</h2>
        <div class="activities-grid">
            ${generateActivityCards(activities.achievements)}
            ${generateActivityCards(activities.onlineCertifications)}
            ${generateActivityCards(activities.sports)}
            ${generateActivityCards(activities.symposiums)}
            ${generateActivityCards(activities.Internship)}
            
            
        </div>
    `;
}

function generateActivityCards(activityList) {
    console.log("Activity list received:", activityList);
    return activityList.map(activity => `
        <div class="activity-card">
            <img src="${activity.image}" alt="${activity.name}">
            <h3>${activity.name}</h3>
            <p>${activity.description}</p>
        </div>
    `).join("");
}

//${generateActivityCards(activities.Needed)}  