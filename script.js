const loginUserNameOrEmail = document.getElementsByName("login-username")[0];
const loginPassword = document.getElementsByName("login-password")[0];
const loginButton = document.getElementById("login-btn");
const googleLoginButton = document.getElementById("google-login");
const linkedinLoginButton = document.getElementById("linkedin-login");
const twitterLoginButton = document.getElementById("twitter-login");
const loginPage = document.getElementById("login-page");
const registerPage = document.getElementById("register-page");
const registerPageText = document.getElementById("register-page-text");

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

function loginValidation() {
  loginButton.addEventListener("click", () => {
    let userExist = false;

    users.forEach((user) => {
      if (
        (loginUserNameOrEmail.value === user.username ||
          loginUserNameOrEmail.value === user.email) &&
        loginPassword.value === user.password
      ) {
        alert("شما با موفقیت وارد حساب کاربری خود شدید.");
        userExist = true;
        return;
      }
    });

    if (loginUserNameOrEmail.value === "")
      alert("لطفا نام کاربری یا ایمیل خود را وارد کنید.");
    else if (loginPassword.value === "")
      alert("لطفا رمز عبور خود را وارد کنید.");
    else if (!userExist) alert("متاسفانه اطلاعات وارد شده، نادرست است.");
  });
}

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

function pageSwitch() {
  registerPageText.addEventListener("click", () => {
    loginPage.className = "deactive";
    registerPage.className = "active";
  });
}

loginValidation();
loginUsingSocialNetworks();
pageSwitch();
