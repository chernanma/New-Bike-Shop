$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $("form.login");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", event => {
    event.preventDefault();
    const employeeData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!employeeData.email || !employeeData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(employeeData.email, employeeData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/dashboard");
        // window.location.replace("/managment");
        // If there's an error, log the error
      })
      .catch(err => {
        //create an lement and append it to the div
        $(".error").prepend("<div class='alert alert-danger' role='alert'>Please enter the correct password</div>");
        console.log(err);
      });
  }
});
