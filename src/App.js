import React from "react";
import "./styles.css";
import Input from "./input/input";
export default class App extends React.Component {
  state = {
    isFormValid: false,
    orderform: {
      name: {
        type: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        type: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      address: {
        type: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address"
        },
        value: "",
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      pin: {
        type: "input",
        elementConfig: {
          type: "text",
          placeholder: "Pin"
        },
        value: "",
        rules: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        isValid: false,
        touched: false
      },
      deliveryMethod: {
        type: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "cheapest",
        touched: false,
        isValid: true,
        rules: {}
      },
      // COD: {
      //   type: "toggle",
      //   elementConfig: {},
      //   value: true
      // },
      COD: {
        type: "checkbox",
        elementConfig: {
          checked: true
        },
        value: true,
        touched: false,
        isValid: true,
        rules: {}
      }
    }
  };

  changed = (event, id) => {
    let updatedForm = { ...this.state.orderform };
    let updatedFormElement = null;
    if (id === "COD") {
      updatedFormElement = {
        ...this.state.orderform[id],
        value: !this.state.orderform[id].value,
        elementConfig: {
          checked: !this.state.orderform[id].elementConfig.checked
        }
      };
    } else {
      updatedFormElement = {
        ...this.state.orderform[id],
        value: event.target.value
      };
    }

    updatedFormElement.isValid =
      updatedFormElement.rules &&
      this.checkValidity(updatedFormElement.value, updatedFormElement.rules);
    updatedFormElement.touched = true;

    updatedForm[id] = updatedFormElement;

    let formValid = true;
    for (let item in updatedForm) {
      formValid = updatedForm[item].isValid && formValid;
    }

    this.setState({ orderform: updatedForm, isFormValid: formValid });
  };

  submitHandler = e => {
    e.preventDefault();

    let data = {};

    for (let key in this.state.orderform) {
      data[key] = this.state.orderform[key].value;
    }

    console.log(data);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    let formElements = [];
    Object.keys(this.state.orderform).map(item => {
      return formElements.push({
        id: item,
        config: this.state.orderform[item]
      });
    });

    return (
      <div className="App">
        <h1>React-Form BoilerPlate</h1>
        <h2>Features</h2>
        <form onSubmit={this.submitHandler}>
          {formElements.map(item => {
            return (
              <Input
                key={item.id}
                value={item.config.value}
                type={item.config.type}
                elementConfig={item.config.elementConfig}
                invalid={!item.config.isValid}
                shouldValidate={item.config.rules}
                touched={item.config.touched}
                changed={event => this.changed(event, item.id)}
              />
            );
          })}
          <button type="submit" disabled={!this.state.isFormValid}>
            submit
          </button>
        </form>
      </div>
    );
  }
}
