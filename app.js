const copyToClipboard = () => {

  const str = document.getElementById("copyText").value
  const clipboard = window.navigator.clipboard
  /*
  * fallback to older browsers (including Safari)
  * if clipboard API not supported
  */
  if (!clipboard || typeof clipboard.writeText !== `function`) {
    const textarea = document.createElement(`textarea`)
    textarea.value = str
    textarea.setAttribute(`readonly`, true)
    textarea.setAttribute(`contenteditable`, true)
    textarea.style.position = `absolute`
    textarea.style.left = `-9999px`
    document.body.appendChild(textarea)
    textarea.select()
    const range = document.createRange()
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    textarea.setSelectionRange(0, textarea.value.length)
    document.execCommand(`copy`)
    document.body.removeChild(textarea)
    return Promise.resolve(true)
  }
  return clipboard.writeText(str)
}

const form = document.querySelector('form');

function insertAfter(newNode, referenceNode) {
  this.insertBefore(newNode, referenceNode.nextElementSibling);

  return newNode;
}

// Takes a single argument, a form input field, and replaces the browsers
// native rendering of form validation errors. Fields where this override
// is applied will display validation errors only when the field is
// invalid and loses focus, or when the field is invalid and it's parent
// form is submitted. When the field regains focus, the validation message
// will update as the user updates the field, finally removing the error
// altogether once the validation constraints have been met.
class FieldValidator {
  constructor(field) {
    this._field = field;
    this._error = null;

    this._onInvalid = this._onInvalid.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onBlur = this._onBlur.bind(this);

    this.bindEventListeners();
  }

  bindEventListeners() {
    this._field.addEventListener('invalid', this._onInvalid);
    this._field.addEventListener('input', this._onInput);
    this._field.addEventListener('blur', this._onBlur);
  }

  // Displays an error message and adds error styles and aria attributes
  showError() {
    let errorNode;

    if (this._error !== null) {
      return this.updateError();
    }

    this._error = document.createElement('div');
    this._error.className = 'help-block';
    this._error.innerHTML = this._field.validationMessage;

    this._field.setAttribute('aria-invalid', 'true');
    this._field.closest('.form-group').classList.add('has-error');

    insertAfter.call(this._field.parentNode, this._error, this._field);
  }

  // Updates an existing error message
  updateError() {
    if (this._error === null) return;

    this._error.innerHTML = this._field.validationMessage;
  }

  // Hides an error message if one is being displayed
  // and removes error styles and aria attributes
  hideError() {
    if (this._error !== null) {
      this._error.parentNode.removeChild(this._error);
      this._error = null;
    }

    this._field.removeAttribute('aria-invalid');
    this._field.closest('.form-group').classList.remove('has-error');
  }

  // Suppress the browsers default error messages
  _onInvalid(event) {
    event.preventDefault();
  }

  // When the user inputs something in to the field,
  // hide the error message if the field is now valid,
  // otherwise update the existing error if one is being shown
  _onInput(event) {
    if (this._field.validity.valid) {
      this.hideError();
    } else {
      this.updateError();
    }
  }

  // When this field loses focus and is invalid, then
  // show the error message
  _onBlur(event) {
    if ( ! this._field.validity.valid) {
      this.showError();
    }
  }
}

Array.prototype.slice.call(form.elements).forEach((element) => {
  element._validator = new FieldValidator(element);
});