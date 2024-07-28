// ----- Define the necessary DOM elements -----
// Variables for login form elements
const loginUserNameOrEmail = document.getElementsByName("login-username")[0];
const loginPassword = document.getElementsByName("login-password")[0];
const forgotPassword = document.getElementById("forgot-password");
const loginButton = document.getElementById("login-btn");
const loginFormInputs = document.getElementById("login-form-inputs");
const googleLoginButton = document.getElementById("google-login");
const linkedinLoginButton = document.getElementById("linkedin-login");
const twitterLoginButton = document.getElementById("twitter-login");
const loginForm = document.getElementById("login-form");
const registerFormText = document.getElementById("register-form-text");

// Variables for registration form elements
const resetButton = document.getElementsByClassName("reset-btn")[0];
const registerUsername = document.getElementsByName("register-username")[0];
const registerEmail = document.getElementsByName("register-email")[0];
const registerPassword = document.getElementsByName("register-password")[0];
const registerPasswordValidate = document.getElementsByName(
  "register-password-validate"
)[0];
const registerButton = document.getElementById("register-btn");
const registerFormInputs = document.getElementById("register-form-inputs");
const googleRegisterButton = document.getElementById("google-register");
const linkedinRegisterButton = document.getElementById("linkedin-register");
const twitterRegisterButton = document.getElementById("twitter-register");
const registerForm = document.getElementById("register-form");
const loginFormText = document.getElementById("login-form-text");

// Variables for welcome message elements
const loginWelcomeForm = document.getElementById("login-welcome-form");
const exitButton = document.getElementById("exit-btn");

// Variables for registration successful message elements
const registerSuccessfulForm = document.getElementById(
  "register-successful-form"
);
const acknowledgeButton = document.getElementById("acknowledge-btn");

// Variables for forgot password form elements
const fpUsername = document.getElementsByName("fp-username")[0];
const fpText = document.getElementById("fp-text");
const fpPassword = document.getElementsByName("fp-password")[0];
const fpPasswordValidate = document.getElementsByName(
  "fp-password-validate"
)[0];
const fpPasswordChangeDiv = document.getElementById("fp-password-change-div");
const fpValidateButton = document.getElementById("fp-validate-btn");
const fpBackButton = document.getElementById("fp-back-btn");
const fpBackButton2 = document.getElementById("fp-back-btn-2");
const fpPasswordChangeButton = document.getElementById(
  "fp-password-change-btn"
);
const fpInputs = document.getElementById("fp-inputs");
const forgotPasswordForm = document.getElementById("forgot-password-form");

// Variables for password change form elements
const passwordChangeForm = document.getElementById("password-change-form");
const psBackButton = document.getElementById("ps-back-btn");

// Variable for email provider validation
const validEmailProviders = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "mac.com",
];

// Variable to get and store users' information from local storage
const storedUsers = localStorage.getItem("users");

// Variables for checking status
let userExist = false;
let userRegistered = false;
let fpUserExist = false;
let fpPasswordChanged = false;

// Variables for success messages
let successfulLoginMessage = document.getElementById(
  "successful-login-message"
);
let successfulRegisterationMessage = document.getElementById(
  "successful-registeration-message"
);
let successfulPasswordChangeMessage = document.getElementById(
  "successful-password-change-message"
);

// Variables for storing users' information
let changedPasswordUser;
let users = [
  {
    username: "Mohsen",
    email: "mohsen@gmail.com",
    password: "Abc@1234",
  },

  {
    username: "Mohammad",
    email: "mohammad@gmail.com",
    password: "aBc@1234",
  },

  {
    username: "Hassan",
    email: "hassan@gmail.com",
    password: "abC@1234",
  },
];

// ----- Define the necessary functions -----
// Set users' information as our users array if available
if (storedUsers) users = JSON.parse(storedUsers);

// Switches between login and registration forms
function pageSwitch() {
  // Switches from login form to registration form
  registerFormText.addEventListener("click", () => {
    loginForm.className = "deactive";
    registerForm.className = "active";
  });

  // Switches from registration form to login form
  loginFormText.addEventListener("click", () => {
    registerForm.className = "deactive";
    loginForm.className = "active";
  });

  // Switches from login form to login welcome form
  if (userExist) {
    loginForm.className = "deactive";
    loginWelcomeForm.className = "active";
  }

  // Switches from login welcome form to login form
  exitButton.addEventListener("click", () => {
    loginWelcomeForm.className = "deactive";
    loginForm.className = "active";

    userExist = false;
    loginFormInputs.reset();
  });

  // Switches from register form to successful register form
  if (userRegistered) {
    registerForm.className = "deactive";
    registerSuccessfulForm.className = "active";
  }

  // Switches from successful register form to login form
  acknowledgeButton.addEventListener("click", () => {
    registerSuccessfulForm.className = "deactive";
    loginForm.className = "active";

    userRegistered = false;
    registerFormInputs.reset();
  });

  // Switches from login form to forgot password form
  forgotPassword.addEventListener("click", () => {
    loginForm.className = "deactive";
    forgotPasswordForm.className = "active";
  });

  // Switches from forgot password form to login form
  fpBackButton.addEventListener("click", () => {
    forgotPasswordForm.className = "deactive";
    loginForm.className = "active";
  });

  // Switches from secondary forgot password form to primary forgot password form
  fpBackButton2.addEventListener("click", () => {
    fpPasswordChangeDiv.className = "deactive";
    fpValidateButton.className = "btn active";
    fpBackButton.className = "btn active";

    fpPassword.value = "";
    fpPasswordValidate.value = "";

    fpUserExist = false;
    fpText.textContent = "لطفا نام کاربری یا ایمیل خود را وارد نمائید.";
  });

  // Switches from secondary forgot password form to successful password change form
  if (fpPasswordChanged) {
    forgotPasswordForm.className = "deactive";
    passwordChangeForm.className = "active";
  }

  // Switches from successful password change form to login form
  psBackButton.addEventListener("click", () => {
    fpPasswordChangeDiv.className = "deactive";
    passwordChangeForm.className = "deactive";
    loginForm.className = "active";

    fpValidateButton.className = "btn active";
    fpBackButton.className = "btn active";

    fpInputs.reset();

    fpUserExist = false;
    fpPasswordChanged = false;
    fpText.textContent = "لطفا نام کاربری یا ایمیل خود را وارد نمائید.";
  });
}

// Displaying welcome message upon successful login
function successfulLoginMessageText() {
  // Retrieve the username of the logged-in user
  const loggedInUser = users.find(
    (user) =>
      loginUserNameOrEmail.value === user.username ||
      loginUserNameOrEmail.value === user.email
  );

  // Display successful login message
  successfulLoginMessage.textContent = `${loggedInUser.username} عزیز، ورود شما موفقیت‌آمیز بود.`;
}

// Validates the login process
function loginValidation() {
  loginButton.addEventListener("click", (event) => {
    // Prevent default form submission when login button is clicked
    event.preventDefault();

    // Checks if the entered username exists
    userExist = false;

    // Welcome message upon successful login
    users.forEach((user) => {
      if (
        (loginUserNameOrEmail.value === user.username ||
          loginUserNameOrEmail.value === user.email) &&
        loginPassword.value === user.password
      ) {
        userExist = true;
        pageSwitch();
        successfulLoginMessageText();
      }
    });

    // Error message for unsuccessful login attempts
    if (loginUserNameOrEmail.value === "")
      alert("لطفا نام کاربری یا ایمیل خود را وارد کنید.");
    else if (loginPassword.value === "")
      alert("لطفا رمز عبور خود را وارد کنید.");
    else if (!userExist) alert("متاسفانه اطلاعات وارد شده، نادرست است.");
  });
}

// Social networks login
function loginUsingSocialNetworks() {
  googleLoginButton.addEventListener("click", () => {
    alert("شما به صفحه ورود از طریق اکانت گوگل خود، هدایت می‌شوید.");
  });
  linkedinLoginButton.addEventListener("click", () => {
    alert("شما به صفحه ورود از طریق اکانت لینکدین خود، هدایت می‌شوید.");
  });
  twitterLoginButton.addEventListener("click", () => {
    alert("شما به صفحه ورود از طریق اکانت توییتر خود، هدایت می‌شوید.");
  });
}

// Validates username input for user registration
function registerUsernameValidation() {
  // Variable for regex pattern to validate valid username characters
  const usernameRegex = /^[A-Za-z0-9\u0600-\u06FF\u06F0-\u06F9._-]+$/;

  // Checks if username input is empty
  if (registerUsername.value === "")
    alert("لطفا یک نام کاربری دلخواه وارد نمائید.");
  // Checks username input length
  else if (
    registerUsername.value.length < 3 ||
    registerUsername.value.length > 16
  )
    alert("نام کاربری کمتر از 3 و بیشتر از 16 حرف نمی‌تواند باشد.");
  // Checks if the username contains valid characters
  else if (!usernameRegex.test(registerUsername.value))
    alert("لطفا از حروف، اعداد و علائم مجاز استفاده نمائید.");
  // Checks if the username is already taken
  else if (users.some((user) => user.username === registerUsername.value))
    alert("این نام کاربری قبلا ثبت شده است.");
  else return true;
}

// Validates the email input for registration
function registerEmailValidation() {
  // Variable for regex pattern to validate valid email address
  // It allows "a-z", "0-9", ".", "-" and "_"
  // However, ".", "-" and "_" are not allowed at the beginning and end of the string
  const emailRegex =
    /^(?![_.-])(?:[A-Za-z0-9]+(?:[._-][A-Za-z0-9]+)*)?(?<![_.-])$/;

  // Checks if email input is empty
  if (registerEmail.value === "") alert("لطفا ایمیل خود را وارد نمائید.");
  // Checks if it has a valid email provider and characters
  else if (
    !validEmailProviders.includes(registerEmail.value.split("@")[1]) ||
    !emailRegex.test(registerEmail.value.split("@")[0])
  )
    alert("لطفا از یک ایمیل معتبر استفاده نمائید.");
  // Checks if the email is already taken
  else if (users.some((user) => registerEmail.value === user.email))
    alert("این ایمیل قبلا ثبت شده است.");
  else return true;
}

// Validates and confirms the password for registration
function registerPasswordValidation() {
  // Variables for regex patterns to check password
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /[0-9]/;
  const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  // Checks if password input is empty
  if (registerPassword.value === "")
    alert("لطفا یک رمز عبور دلخواه وارد نمائید.");
  // Checks password input length
  else if (
    registerPassword.value.length < 8 ||
    registerPassword.value.length > 24
  )
    alert("رمز عبور کمتر از 8 و بیشتر از 24 حرف نمی‌تواند باشد.");
  // Checks if password contains "upper case", "lower case", "numeric" and "special characters or symbols"
  else if (
    !uppercaseRegex.test(registerPassword.value) ||
    !lowercaseRegex.test(registerPassword.value) ||
    !digitRegex.test(registerPassword.value) ||
    !symbolRegex.test(registerPassword.value)
  )
    alert(
      "رمز عبور باید حداقل شامل یک حرف بزرگ انگلیسی، یک حرف کوچک انگلیسی، یک عدد و یک کاراکتر ویژه باشد."
    );
  // Checks if password validation input is empty and matches the password
  else if (registerPasswordValidate.value === "")
    alert("لطفا تایید رمز عبور را وارد نمائید.");
  else if (registerPassword.value !== registerPasswordValidate.value)
    alert("رمز عبور و تایید رمز عبور، یکسان نمی‌باشند.");
  else return true;
}

// Validates the complete registration process
function registrationValidation() {
  registerButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Variable to check if the entered username exists
    userRegistered = false;

    // Checks if every input is correctly filled
    if (registerUsernameValidation())
      if (registerEmailValidation())
        if (registerPasswordValidation()) {
          // Add user's information to the users array
          users.push({
            username: registerUsername.value,
            email: registerEmail.value,
            password: registerPassword.value,
          });

          userRegistered = true;

          // Updates the users array in local storage
          localStorage.setItem("users", JSON.stringify(users));

          // Displaying successful registration message
          pageSwitch();
          successfulRegisterationMessage.textContent = `${registerUsername.value} عزیز، ثبت نام شما با موفقیت انجام شد.`;
        }
  });
}

// Social networks registeration
function registerUsingSocialNetworks() {
  googleRegisterButton.addEventListener("click", () => {
    alert("شما به صفحه ثبت نام از طریق اکانت گوگل خود، هدایت می‌شوید.");
  });
  linkedinRegisterButton.addEventListener("click", () => {
    alert("شما به صفحه ثبت نام از طریق اکانت لینکدین خود، هدایت می‌شوید.");
  });
  twitterRegisterButton.addEventListener("click", () => {
    alert("شما به صفحه ثبت نام از طریق اکانت توییتر خود، هدایت می‌شوید.");
  });
}

// Validates username input for forgot password
function fpUsernameValidation() {
  fpValidateButton.addEventListener("click", (event) => {
    // Prevent default form submission when button is clicked
    event.preventDefault();

    // Checks if the entered username exists
    fpUserExist = false;

    // Checks if the input is empty or has a correct value
    users.forEach((user) => {
      if (
        fpUsername.value === user.username ||
        fpUsername.value === user.email
      ) {
        fpUserExist = true;
        fpValidateButton.className = "btn deactive";
        fpBackButton.className = "btn deactive";
        fpPasswordChangeDiv.className = "active";

        fpText.textContent =
          "لطفا رمز عبور جدید و تایید رمز عبور جدید را وارد نمائید.";

        // Get the username of the user who changed their password
        changedPasswordUser = users.find(
          (user) =>
            fpUsername.value === user.username ||
            fpUsername.value === user.email
        );
      }
    });

    if (fpUsername.value === "")
      alert("لطفا نام کاربری یا ایمیل خود را وارد کنید.");
    else if (!fpUserExist)
      alert("متاسفانه نام کاربری یا ایمیل وارد شده، صحیح نمی‌باشد.");
  });
}

// Validates and confirms the new password for forgot password
function fpPasswordValidation() {
  fpPasswordChangeButton.addEventListener("click", (event) => {
    // Prevent default form submission when button is clicked
    event.preventDefault();

    // Variables for regex patterns to check new password
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Checks if the password has changed
    fpPasswordChanged = false;

    // Checks if new password input is empty
    if (fpPassword.value === "")
      alert("لطفا یک رمز عبور جدید دلخواه وارد نمائید.");
    // Checks new password input length
    else if (fpPassword.value.length < 8 || fpPassword.value.length > 24)
      alert("رمز عبور جدید کمتر از 8 و بیشتر از 24 حرف نمی‌تواند باشد.");
    // Checks if new password contains "upper case", "lower case", "numeric" and "special characters or symbols"
    else if (
      !uppercaseRegex.test(fpPassword.value) ||
      !lowercaseRegex.test(fpPassword.value) ||
      !digitRegex.test(fpPassword.value) ||
      !symbolRegex.test(fpPassword.value)
    )
      alert(
        "رمز عبور جدید باید حداقل شامل یک حرف بزرگ انگلیسی، یک حرف کوچک انگلیسی، یک عدد و یک کاراکتر ویژه باشد."
      );
    // Checks if the new password is the same as the previous one
    else if (fpPassword.value === changedPasswordUser.password)
      alert("رمز عبور جدید باید با رمز عبور قبلی متفاوت باشد.");
    // Checks if new password validation input is empty and matches the new password
    else if (fpPasswordValidate.value === "")
      alert("لطفا تایید رمز عبور جدید را وارد نمائید.");
    else if (fpPassword.value !== fpPasswordValidate.value)
      alert("رمز عبور جدید و تایید رمز عبور جدید، یکسان نمی‌باشند.");
    // Updates the user's password
    else {
      users.forEach((user) => {
        if (
          fpUsername.value === user.username ||
          fpUsername.value === user.email
        )
          fpPasswordChanged = true;
        user.password = fpPassword.value;
      });

      // Updates the users array in local storage
      localStorage.setItem("users", JSON.stringify(users));

      // Showing successful password changed message
      pageSwitch();
      successfulPasswordChangeMessage.textContent = `${changedPasswordUser.username} عزیز، رمز عبور شما با موفقیت تغییر یافت.`;
    }
  });
}

// Handles password change process
function fpChangePassword() {
  fpUsernameValidation();
  fpPasswordValidation();
}

function reset() {
  resetButton.addEventListener("click", () => {
    localStorage.clear();
    loginFormInputs.reset();
    registerFormInputs.reset();
    fpInputs.reset();

    userExist = false;
    fpUserExist = false;
    userRegistered = false;

    users = [
      {
        username: "Mohsen",
        email: "mohsen@gmail.com",
        password: "Abc@1234",
      },

      {
        username: "Mohammad",
        email: "mohammad@gmail.com",
        password: "aBc@1234",
      },

      {
        username: "Hassan",
        email: "hassan@gmail.com",
        password: "abC@1234",
      },
    ];

    registerForm.className = "deactive";
    loginWelcomeForm.className = "deactive";
    registerSuccessfulForm.className = "deactive";
    forgotPasswordForm.className = "deactive";
    fpPasswordChangeDiv.className = "deactive";
    passwordChangeForm.className = "deactive";

    loginForm.className = "active";
    fpValidateButton.className = "btn active";
    fpBackButton.className = "btn active";
  });
}

// Calling the functions
loginValidation();
loginUsingSocialNetworks();
registrationValidation();
registerUsingSocialNetworks();
fpChangePassword();
pageSwitch();
reset();
