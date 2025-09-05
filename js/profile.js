// ✅ Profile picture preview
    const fileInput = document.getElementById("profile-pic");
    const preview = document.getElementById("preview");
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        preview.src = URL.createObjectURL(file);
      }
    });

    // ✅ Validation handling
    const form = document.getElementById("profileForm");
    form.addEventListener("submit", (e) => {
      let valid = true;
      form.querySelectorAll("input[required]").forEach(field => {
        const error = field.nextElementSibling;
        if (!field.checkValidity()) {
          error.style.display = "block";
          valid = false;
        } else {
          if (error) error.style.display = "none";
        }
      });
      if (!valid) e.preventDefault();
    });

    // ✅ Live validation
    form.querySelectorAll("input, textarea").forEach(field => {
      field.addEventListener("input", () => {
        const error = field.nextElementSibling;
        if (error && field.checkValidity()) {
          error.style.display = "none";
        }
      });
    });