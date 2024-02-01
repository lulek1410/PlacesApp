import React from "react";
import { PlaceList } from "../components/PlaceList";
import { useParams } from "react-router-dom";

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
		creator: 2,
	},
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
		creator: 2,
	},
];

export const UserPlaces = () => {
	const { userId } = useParams();
	const lodadePlaces = testData.filter(
		(place) => place.creator === Number(userId)
	);

	return <PlaceList items={lodadePlaces} />;
};
