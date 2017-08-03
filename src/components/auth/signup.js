import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signupUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }

    renderField({ input, label, type, meta: { touched, error } }) {
        let groupClassName = 'form-group';
        let inputClassName = 'form-control';

        if (touched && error) {
            groupClassName += ' has-danger';
            inputClassName += ' form-control-danger';
        }

        return (
            <fieldset className={groupClassName}>
                <label className="form-control-label">{label}:</label>
                <input
                    {...input}
                    className={inputClassName}
                    placeholder={label} 
                    type={type} />
                <div className="form-control-feedback">
                    {touched ? error : ''}
                </div>
            </fieldset>
        );
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field
                    name="email"
                    type="text" 
                    component={this.renderField}
                    label="Email" />
                <Field
                    name="password"
                    type="password"
                    component={this.renderField}
                    label="Password" />
                <Field
                    name="passwordConfirm"
                    type="password"
                    component={this.renderField}
                    label="Confirm password" />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                    Sign up
                </button>
            </form>
        );
    }
}

const validate = (values) => {
    const errors = {};

    if (!values.email){
        errors.email = 'Please enter an email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords must match';
    }

    return errors;
}

const mapStateToProps = (state) => {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'signup',
    validate
})(connect(mapStateToProps, actions)(Signup));