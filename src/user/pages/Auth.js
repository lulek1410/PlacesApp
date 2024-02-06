import React from "react";

import Button from "../../shared/FormElements/Button";
import Input from "../../shared/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./Auth.css";

export const Auth = () => {
	const [formState, inputHandler] = useForm(
		{
			email: { value: "", isValid: false },
			password: { value: "", isValid: false },
		},
		false
	);

	authSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState.inputs);
	};

	return (
		<Card className="authentication">
			<h2>Login Required</h2>
			<hr />
			<form onSubmit={authSubmitHandler}>
				<Input
					element="input"
					id="email"
					type="emeil"
					label="E-mail"
					validators={[VALIDATOR_EMAIL()]}
					errorText="Please enter a valid email address."
					onInput={inputHandler}
				/>
				<Input
					element="input"
					id="password"
					type="password"
					label="Password"
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText="Please enter a valid password, at least 5 characters."
					onInput={inputHandler}
				/>
				<Button type="submit" disabled={!formState.isValid}>
					LOGIN
				</Button>
			</form>
		</Card>
	);
};
