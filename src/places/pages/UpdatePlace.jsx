import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./PlaceForm.css";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/components/UIElements/Card";

const testData = [
	{
		id: 1,
		title: "Empire state building",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium provident culpa fugit eveniet quidem ut eligendi vitae earum incidunt repellendus facilis nam blanditiis quo adipisci iste, fuga maiores, accusamus corrupti?",
		image: "https://media.timeout.com/images/101705309/image.jpg",
		address: "20 W 34th St., New York, NY 10001, United States",
		location: {
			lat: 40.7484445,
			lng: -73.9882447,
		},
		creator: 1,
	},
	{
		id: 2,
		title: "Empire state building",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium provident culpa fugit eveniet quidem ut eligendi vitae earum incidunt repellendus facilis nam blanditiis quo adipisci iste, fuga maiores, accusamus corrupti?",
		image: "https://media.timeout.com/images/101705309/image.jpg",
		address: "20 W 34th St., New York, NY 10001, United States",
		location: {
			lat: 40.7484445,
			lng: -73.9882447,
		},
		creator: 1,
	},
	{
		id: 3,
		title: "Emp. state building",
		description:
			"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium provident culpa fugit eveniet quidem ut eligendi vitae earum incidunt repellendus facilis nam blanditiis quo adipisci iste, fuga maiores, accusamus corrupti?",
		image: "https://media.timeout.com/images/101705309/image.jpg",
		address: "20 W 34th St., New York, NY 10001, United States",
		location: {
			lat: 40.7484445,
			lng: -73.9882447,
		},
		creator: 1,
	},
];

export const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);
	const placeId = Number(useParams().placeId);
	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: "",
				isValid: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		false
	);

	const identifiedPlace = testData.find((p) => p.id === placeId);
	useEffect(() => {
		if (identifiedPlace) {
			setFormData(
				{
					title: {
						value: identifiedPlace.title,
						isValid: true,
					},
					description: {
						value: identifiedPlace.description,
						isValid: true,
					},
				},
				true
			);
		}
		setIsLoading(false);
	}, [setFormData, identifiedPlace]);

	const placeUpdateSubmitHandler = (e) => {
		e.preventDefault();
		console.log(formState);
	};

	if (!identifiedPlace) {
		return (
			<div className="center">
				<Card>
					<h2>Could not find place!</h2>
				</Card>
			</div>
		);
	}
	return isLoading ? (
		<div>Loading...</div>
	) : (
		<form className="place-form">
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title."
				onInput={inputHandler}
				initialValue={formState.inputs.title.value}
				initialValidity={formState.inputs.title.isValid}
			/>
			<Input
				id="description"
				element="textarea"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description (min. 5 characters)."
				onInput={inputHandler}
				initialValue={formState.inputs.description.value}
				initialValidity={formState.inputs.description.isValid}
			/>

			<Button type="submit" disabled={!formState.isValid}>
				UPDATE PLACE
			</Button>
		</form>
	);
};
