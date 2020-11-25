$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const firstNameInput = $("input#first-name-input");
  const lastNameInput = $("input#last-name-input");
  const jobTitleInput = $("input#job-title-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const employeeData = {
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      job_title: jobTitleInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!employeeData.email || !employeeData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(employeeData.email, employeeData.password);
    firstNameInput.val("");
    lastNameInput.val("");
    jobTitleInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/employees");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
