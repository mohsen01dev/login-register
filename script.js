// Define the necessary DOM elements
const loginUserNameOrEmail = document.getElementsByName("login-username")[0];
const loginPassword = document.getElementsByName("login-password")[0];
const loginButton = document.getElementById("login-btn");
const registerUsername = document.getElementsByName("register-username")[0];
const registerEmail = document.getElementsByName("register-email")[0];
const registerPassword = document.getElementsByName("register-password")[0];
const registerPasswordValidate = document.getElementsByName(
  "register-password-validate"
)[0];
const registerButton = document.getElementById("register-btn");
const googleLoginButton = document.getElementById("google-login");
const linkedinLoginButton = document.getElementById("linkedin-login");
const twitterLoginButton = document.getElementById("twitter-login");
const googleRegisterButton = document.getElementById("google-register");
const linkedinRegisterButton = document.getElementById("linkedin-register");
const twitterRegisterButton = document.getElementById("twitter-register");
const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");
const registerPageText = document.getElementById("register-page-text");
const loginPageText = document.getElementById("login-page-text");

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

// Variable for storing users' information
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

// Get users' information from local storage and set it as our users array if available
const storedUsers = localStorage.getItem("users");

if (storedUsers) users = JSON.parse(storedUsers);

// Switches between login and registration forms
function pageSwitch() {
  // Switches from login form to registration form
  registerPageText.addEventListener("click", () => {
    loginPage.className = "deactive";
    registerPage.className = "active";
  });

  // Switches from registration form to login form
  loginPageText.addEventListener("click", () => {
    registerPage.className = "deactive";
    loginPage.className = "active";
  });
}

// Validates the login process
function loginValidation() {
  loginButton.addEventListener("click", () => {
    let userExist = false;

    // Welcome message upon successful login
    users.forEach((user) => {
      if (
        (loginUserNameOrEmail.value === user.username ||
          loginUserNameOrEmail.value === user.email) &&
        loginPassword.value === user.password
      ) {
        alert("شما با موفقیت وارد حساب کاربری خود شدید.");
        userExist = true;
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
  else if (users.some((user) => user.email === registerEmail.value))
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

  // Checks the password
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
  // Checks the password validation
  // Checks if password validation input is empty
  else if (registerPasswordValidate.value === "")
    alert("لطفا تایید رمز عبور را وارد نمائید.");
  else if (registerPassword.value !== registerPasswordValidate.value)
    alert("رمز عبور و تایید رمز عبور، یکسان نمی‌باشند.");
  else return true;
}

// Validates the complete registration process
function registrationValidation() {
  registerButton.addEventListener("click", () => {
    if (registerUsernameValidation())
      if (registerEmailValidation())
        if (registerPasswordValidation()) {
          // Add user's information to the users array
          users.push({
            username: registerUsername.value,
            email: registerEmail.value,
            password: registerPassword.value,
          });

          // Set the users array in local storage
          localStorage.setItem("users", JSON.stringify(users));

          alert("ثبت نام شما با موفقیت انجام شد.");
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

// Calling the functions
loginValidation();
loginUsingSocialNetworks();
pageSwitch();
registrationValidation();
registerUsingSocialNetworks();
