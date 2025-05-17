function startBuilding() {
  document.getElementById("hero").style.display = "none";
  document.getElementById("builder").style.display = "block";
}

function addExperience() {
  const section = document.getElementById("experienceSection");
  const entry = document.createElement("div");
  entry.className = "exp-entry";
  entry.innerHTML = `
    <input type="text" class="jobTitle" placeholder="Job Title" />
    <input type="text" class="company" placeholder="Company Name" />
    <input type="text" class="duration" placeholder="Duration" />
    <textarea class="jobDetails" placeholder="Job Responsibilities"></textarea>`;
  section.appendChild(entry);
}

function addEducation() {
  const section = document.getElementById("educationSection");
  const entry = document.createElement("div");
  entry.className = "edu-entry";
  entry.innerHTML = `
    <input type="text" class="degree" placeholder="Degree" />
    <input type="text" class="institution" placeholder="Institution" />
    <input type="text" class="eduDuration" placeholder="Duration" />
    <input type="text" class="grade" placeholder="Grade" />`;
  section.appendChild(entry);
}

function addProject() {
  const section = document.getElementById("projectSection");
  const entry = document.createElement("div");
  entry.className = "project-entry";
  entry.innerHTML = `
    <input type="text" class="projectTitle" placeholder="Project Title" />
    <textarea class="projectDesc" placeholder="Description"></textarea>
    <input type="text" class="projectLink" placeholder="Project Link (optional)" />`;
  section.appendChild(entry);
}

document.getElementById("resumeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const output = document.getElementById("resumeOutput");
  output.innerHTML = "";

  const name = document.getElementById("fullName").value;
  const title = document.getElementById("title").value;
  const profile = document.getElementById("profile").value;
  const guardian = document.getElementById("guardian").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const github = document.getElementById("github").value;
  const address = document.getElementById("address").value;
  const skills = document.getElementById("skills").value;
  const languages = document.getElementById("languages").value;
  const hobbies = document.getElementById("hobbies").value;

  const image = document.getElementById("profileImage").files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    const img = `<img src="${reader.result}" class="preview" alt="profile"/>`;

    let html = `
      ${img}
      <h2>${name}</h2>
      <h4>${title}</h4>
      <p><strong>Guardian:</strong> ${guardian}</p>
      <p>📧 ${email}</p>
      <p>📞 ${phone}</p>
      <p>📍 ${address}</p>
      <p>🔗 ${github}</p>
      <h3>Profile</h3><p>${profile}</p>`;

    document.querySelectorAll(".exp-entry").forEach(e => {
      const job = e.querySelector(".jobTitle").value;
      const comp = e.querySelector(".company").value;
      const dur = e.querySelector(".duration").value;
      const det = e.querySelector(".jobDetails").value;
      if (job && comp) {
        html += `<h4>${job} at ${comp} (${dur})</h4><p>${det}</p>`;
      }
    });

    html += "<h3>Education</h3>";
    document.querySelectorAll(".edu-entry").forEach(e => {
      const degree = e.querySelector(".degree").value;
      const inst = e.querySelector(".institution").value;
      const dur = e.querySelector(".eduDuration").value;
      const grade = e.querySelector(".grade").value;
      html += `<p>${degree} - ${inst} (${dur}) - Grade: ${grade}</p>`;
    });

    const projects = document.querySelectorAll(".project-entry");
    if ([...projects].some(p => p.querySelector(".projectTitle").value)) {
      html += "<h3>Projects</h3>";
      projects.forEach(p => {
        const title = p.querySelector(".projectTitle").value;
        const desc = p.querySelector(".projectDesc").value;
        const link = p.querySelector(".projectLink").value;
        if (title) {
          html += `<p><strong>${title}</strong>: ${desc} <a href="${link}" target="_blank">${link}</a></p>`;
        }
      });
    }

    html += `<h3>Skills</h3><p>${skills}</p>`;
    html += `<h3>Languages</h3><p>${languages}</p>`;
    html += `<h3>Hobbies</h3><p>${hobbies}</p>`;

    output.innerHTML = html;
  };

  if (image) {
    reader.readAsDataURL(image);
  }
});

function downloadPDF() {
  const element = document.getElementById("resumeOutput");
  const opt = {
    margin: 0.5,
    filename: 'My_Resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
}
