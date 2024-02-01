import React, { useEffect, useRef } from "react";

import "./Map.css";

export const Map = (props) => {
	const mapRef = useRef(null);

	const { center, zoom } = props;

	useEffect(() => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: props.center,
			zoom: props.zoom,
		});

		new window.google.maps.Marker({ position: props.center, map });
	}, [center, zoom]);

	return (
		<div ref={mapRef} className={`map ${props.className}`} style={props.style}>
			Map
		</div>
	);
};
