const editBioButton = document.getElementById("editBioButton");
const bioParagraph = document.querySelector(".bio");
const bioTextarea = document.getElementById("bioTextarea");
const saveBioButton = document.getElementById("saveBioButton");
const backBioButton = document.getElementById("backBioButton");

editBioButton.addEventListener("click", () => {
  editBioButton.style.display = "none";
  bioParagraph.style.display = "none";
  bioTextarea.style.display = "block";
  saveBioButton.style.display = "block";
  backBioButton.style.display = "block";
});

backBioButton.addEventListener("click", () => {
  bioParagraph.style.display = "block";
  bioTextarea.style.display = "none";
  saveBioButton.style.display = "none";
  editBioButton.style.display = "block";
  backBioButton.style.display = "none";
});

saveBioButton.addEventListener("click", () => {
  const updatedBio = bioTextarea.value;

  fetch("/api/user/bio", {
    method: "POST",
    body: JSON.stringify({ bio: updatedBio }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      bioParagraph.textContent = updatedBio;
      bioParagraph.style.display = "block";
      bioTextarea.style.display = "none";
      saveBioButton.style.display = "none";
      editBioButton.style.display = "block";
      backBioButton.style.display = "none";
    })
    .catch((error) => {
      console.error("Error updating bio:", error);
    });
});
