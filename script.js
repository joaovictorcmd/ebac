const form = document.querySelector(".form");

const fields = {
  a: document.querySelector("#a"),
  b: document.querySelector("#b"),
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkInputs();
});

function checkInputs() {
  const validations = {
    a: {
      required: true,
      messages: {
        required: "Preencha este campo",
      },
    },
    b: {
      required: true,
      messages: {
        required: "Preencha este campo",
        greaterThanA: "O Campo B precisa ser maior que o Campo A",
      },
    },
  };

  Object.keys(fields).forEach((field) => {
    const input = fields[field];
    const value = input.value.trim();
    const validation = validations[field];

    if (validation.required && value === '') {
      errorValidation(input, validation.messages.required);
    } else if (field === "b" && fields["a"].value.trim() !== "" && parseFloat(value) <= parseFloat(fields["a"].value.trim())) {
      errorValidation(input, validation.messages.greaterThanA);
    } else {
      successValidation(input);
    }
  });
}

function errorValidation(input, message) {
  const div = input.parentElement;
  const small = div.querySelector('small');
  const successText = document.querySelector('#successText');

  small.innerText = message;
  small.className = "form-text text-danger";
  input.className = "form-control border-danger";
  successText.className = "d-none";
}

function successValidation(input) {
  const div = input.parentElement;
  const small = div.querySelector('small');
  const successText = document.querySelector('#successText');

  small.className = "d-none";
  input.className = "form-control border-success";
  successText.className = "d-block text-center text-uppercase text-success fs-5 fw-bold"
}