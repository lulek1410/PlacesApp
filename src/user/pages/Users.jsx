import React from "react";
import { UsersList } from "../components/UsersList";

const testData = [
	{
		id: 1,
		name: "Mike Shwartz",
		image:
			"https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png",
		places: 3,
	},
];

export const Users = () => {
	return <UsersList items={testData} />;
};
