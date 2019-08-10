import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SelectField from "material-ui/SelectField";
import DatePicker from "material-ui/DatePicker";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Button from '@material-ui/core/Button';
import moment from "moment";


class Welcome extends React.Component {
  onSubmit = formProps => {
    console.log(formProps);
    
    
    
    const  startFinal = Date.parse(formProps.startDate);
    console.log(startFinal);

    const  endFinal = Date.parse(formProps.endDate);
    console.log(endFinal);


    if(endFinal < startFinal){
      alert('wrong')
    } else {
      alert('good')
    }

   
    
  };

  render() {
    const { handleSubmit } = this.props;

    const renderSelectField = ({
      input,
      label,
      meta: { touched, error },
      children,
      ...custom
    }) => (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    );
    const renderDatePicker = ({
      input,
      defaultValue,
      meta: { touched, error },
      label
    }) => (
      <DatePicker
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        value={input.value !== "" ? new Date(input.value) : null}
        onChange={(event, value) => {
          // const formatDate = value;
          // const responseDate = moment(formatDate).format("DD/MM/YYYY");
          const formatDate = value
          const responseDate = moment(formatDate).format('L'); 
          input.onChange(responseDate);
        }}
      />
    );

    const renderField = ({ input, label, meta: { touched, error } }) => (
      <TextField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, value) => input.onChange(value)}
      />
    )

    return (
      <MuiThemeProvider>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div className="row">
          <div className="col s12 m2">
              <div className="Boxinput">
              <Field
                 name="city"
                type="text"
                id="city"
                component={renderField}
                label="City"
              />
              </div>
            </div>
            <div className="col s12 m2">
              <div className="Boxinput">
                <Field
                  name="startDate"
                  type="date"
                  label="Pick up at"
                  component={renderDatePicker}
                  hintText="Checkin Date"
                  autoOk={true}
                />
              </div>
            </div>
            <div className="col s12 m3">
              <div className="Boxinput">
                <Field
                  name="StartHour"
                  component={renderSelectField}
                  label="Hour"
                >
                  <MenuItem
                    value={"Morning"}
                    label="5 am - 12 pm"
                    primaryText="Morning"
                  />
                  <MenuItem
                    value={"Afternoon"}
                    label="12 pm - 5 pm"
                    primaryText="Afternoon"
                  />
                  <MenuItem
                    value={"Evening"}
                    label="5 pm - 9 pm"
                    primaryText="Evening"
                  />
                  <MenuItem
                    value={"Night"}
                    label="9 pm - 5 am"
                    primaryText="Night"
                  />
                </Field>
              </div>
            </div>
            <div className="col s12 m2">
              <div className="Boxinput">
                <Field
                  name="endDate"
                  type="date"
                  label="Drop off at"
                  component={renderDatePicker}
                  hintText="Checkin Date"
                  autoOk={true}
                />
              </div>
            </div>
            <div className="col 12 m3">
              <div className="Boxinput">
                <Field
                  name="EndHour"
                  component={renderSelectField}
                  label="Hour"
                >
                  <MenuItem
                    value={"Morning"}
                    label="5 am - 12 pm"
                    primaryText="Morning"
                  />
                  <MenuItem
                    value={"Afternoon"}
                    label="12 pm - 5 pm"
                    primaryText="Afternoon"
                  />
                  <MenuItem
                    value={"Evening"}
                    label="5 pm - 9 pm"
                    primaryText="Evening"
                  />
                  <MenuItem
                    value={"Night"}
                    label="9 pm - 5 am"
                    primaryText="Night"
                  />
                </Field>
              </div>
            </div>
          </div>
          <div className="row">
          <Button type='submit' variant="outlined">
            Primary
          </Button>
            </div>
        </form>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: "search" })
)(Welcome);
