let currentPage = 1;
let saveTimeOut;

const showPage = (pageNumber) => {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none")); // hide all the pages
  pages[pageNumber - 1].style.display = "block";
  currentPage = pageNumber;
};

const isFieldsFilled = (pageNumber) => {
  const pageInputs = document.querySelectorAll(`.page-${pageNumber} input`);
  for (const input of pageInputs) {
    const feedbackDiv = document.getElementById(`${input.id}Feedback`);
    if (input.value.trim() === "" | (input.type === "checkbox" && !input.checked)) {
      input.classList.add("border-danger");
      feedbackDiv.innerHTML =
        "<p class='text-danger'>This field is required</p>";
      return false;
    } 
    input.classList.remove("border-danger");
    feedbackDiv.innerHTML = "";
  }
  return true;
};

const nextPage = () => {
  if (isFieldsFilled(currentPage)) {
    showPage(currentPage + 1);
  }
};

const prevPage = () => {
  showPage(currentPage - 1);
};

const saveFormData = () => {
  const formData = {};
  document.querySelectorAll("input").forEach((input) => {
    if (input.value.trim() != "" && input.type != "password") {
      formData[input.name] = input.value;
    }
  });
  localStorage.setItem("formData", JSON.stringify(formData));
};

const loadFormData = () => {
  const savedData = localStorage.getItem("formData");
  if (savedData) {
    const formData = JSON.parse(savedData);
    document.querySelectorAll("input").forEach((input) => {
      input.value = formData[input.name] || "";
    });
  }
};

const submitForm = () => {
  if (isFieldsFilled(currentPage)) {
    const passwordField = document.getElementById("passwordInput")
    const confirmPasswordField = document.getElementById("confirmPasswordInput")

    if (passwordField.value != confirmPasswordField.value) {
      passwordField.classList.add("border-danger")
      const feedbackDiv = document.getElementById(`${passwordField.id}Feedback`);
      feedbackDiv.innerHTML =
        "<p class='text-danger'>Passwords do not match</p>";
      passwordField.value == ""
      confirmPasswordField.value == ""
    } else {
      document.querySelector(".submitted").classList.remove("d-none")
      document.querySelector("form").reset()
      localStorage.removeItem("formData")
      showPage(currentPage + 1)
    }
  }
}

showPage(currentPage);
loadFormData();

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    clearTimeout(saveTimeOut);
    saveTimeOut = setTimeout(saveFormData, 1000);
  });
});
