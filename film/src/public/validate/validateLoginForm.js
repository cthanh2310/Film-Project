
// const formData = {};
function Validator(formSelector) {
    console.log(formSelector);
    formElement = document.querySelector(formSelector);
    // console.log(formElement);
    var inputs = formElement.querySelectorAll('[name][rules]');
    var formRules = {

    };
    validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng nhập trường này'
        },
        isEmail: function (value) {
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value) ? undefined : 'Nhập đúng định dạng email!'
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Vui lòng nhập tối thiếu ${min} ký tự`;
            }
        }

    };
    function getParent(element, selector) {
        // console.log(element.parentElement);
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    for (var input of inputs) { // design validate for inputs
        // console.log(input.name);
        var rules = input.getAttribute('rules');
        rules = rules.split('|');
        formRules[input.name] = [];
        for (rule of rules) {
            var colon = rule.includes(':');
            var ruleColon;
            if (colon) {
                ruleColon = rule.split(':');
                rule = ruleColon[0];
            }
            ruleFunc = validatorRules[rule];  // function
            if (colon) {
                ruleFunc = ruleFunc(ruleColon[1]);
            }
            formRules[input.name].push(ruleFunc);

        }
        // in case of ':'
        input.onblur = Onblur;
        input.oninput = Oninput;

    }
    // console.log(formRules);
    function Onblur(event) {
        // console.log(event.target);  // get Input
        // console.log(event)
        var rules = formRules[event.target.name];
        // console.log(rules);
        var errorMessage;
        for (var rule of rules) {
            errorMessage = rule(event.target.value);
            // console.log(errorMessage);
            if (errorMessage) {
                break;
            }

        }
        if (errorMessage) {
            var formParent = getParent(event.target, '.form-group');
            if (formParent) {
                formParent.classList.add('invalid');
                var formMessage = formParent.querySelector('.form-message');
                formMessage.innerHTML = errorMessage;
            }
        }
        return !errorMessage; // convert to boolean, error = false
    }
    function Oninput(event) {
        var formParent = getParent(event.target, '.form-group');
        var formMessage = formParent.querySelector('.form-message');
        if (formMessage) {
            formParent.classList.remove('invalid');
            formMessage.innerHTML = '';
        }

    }
    formElement.onsubmit = function (event) {
        event.preventDefault();
        // console.log(event.target);
        var checkError = false;
        var inputs = formElement.querySelectorAll('[name][rules]')
        for (var input of inputs) {
            if (!Onblur({ target: input })) {    // vd: onblur = !error , !onblur = error . error = null --> !error = haveError
                checkError = true;
            }
        }
        if (!checkError) {
    
            var enableInputs = formElement.querySelectorAll("[name]:not([disabled])"); // nodeList
            var formValues = Array.from(enableInputs);
            // console.log(formValues);

            formValues = formValues.reduce(function (values, input) {   // reduce(function,{}) values = {};
                switch (input.type) {
                    case "radio":
                        values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                        break;

                    default:                                
                        values[input.name] = input.value;
                }  // input = Object formValues
                // console.log(values);
                return values; 
            }, {});
            
            document.querySelector(formSelector).submit()
        }


    }
}

Validator('#login-form');   