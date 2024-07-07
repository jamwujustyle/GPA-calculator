"use strict";

const addCoursesButton = document.querySelector(".add-course-link");
const courseList = document.getElementById("course-list");
const calculateButton = document.getElementById('calculate');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal')
document.querySelector('.clear-btn').addEventListener('click', function () {
  document.getElementById('course-form').reset();
})

addCoursesButton.addEventListener("click", function () {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
  <td><input type="text" placeholder="Course" /></td>
            <td><input class="credits" type="text" placeholder="Credits" /></td>
            <td>
              <select class="grade">
              <option>A</option>
              <option>A-</option>
              <option>B+</option>
                <option>B</option>
                <option>B-</option>
                <option>C+</option>
                <option>C</option>
                <option>C-</option>
                <option>D+</option>
                <option>D</option>
                <option>F</option>
              </select>
            </td>`;
  courseList.appendChild(newRow);
});

const gradePoints = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D+": 1.3,
  "D": 1.0,
  "F": 0.0,
};

const calculateGpa = () => {
  const creditInputs = document.querySelectorAll(".credits");
  const gradeSelects = document.querySelectorAll(".grade");

  let totalPoints = 0, totalCredits = 0;

  creditInputs.forEach((creditInput, index) => {
    const credits = parseFloat(creditInput.value);
    const grades = gradeSelects[index].value;
    const gradePoint = gradePoints[grades];

    if(!isNaN(credits) && gradePoint !== undefined) {
      totalCredits += credits;
      totalPoints += credits * gradePoint;
    }
  });
  if(totalCredits === 0) {
    return 0;
  }
  const result = totalPoints / totalCredits;
  
  return result;

};

const showModal = (message) => {
  modal.textContent = message;
  modal.classList.remove('hidden')
}

const hideModal = () => {
  modal.classList.add('hidden')
}

calculateButton.addEventListener('click', function() {

  const gpa = calculateGpa();

  if(gpa === 0) {
    alert(`Cannot calculate your GPA. Enter valid credits and grades`)
    modal.style.display('none');
  } else{
      if(gpa > 3.20) {
        modal.style.color = 'green'
      }else if(gpa > 2.80 && gpa < 3.19) {
        modal.style.color = 'yellow'
      }else {
        modal.style.color = 'red'
      }
    console.log(`your GPA is ${gpa.toFixed(2)}`);
    showModal(`your GPA is ${gpa.toFixed(2)}`)
  }

})

closeModalBtn.addEventListener('click', hideModal)


document.addEventListener('keydown', function (e) {
  if(e.key === "Escape" && !modal.classList.contains('hidden')) hideModal();
}) 

