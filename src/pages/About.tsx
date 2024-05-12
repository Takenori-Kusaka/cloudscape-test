import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import type React from "react";

const About: React.FC = () => {
	return (
		<Container header={<Header variant="h2">About Us</Header>}>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
				vestibulum orci vel malesuada congue. Sed euismod, sapien eget aliquam
				tincidunt, risus elit tincidunt nibh, vitae suscipit justo velit at
				velit.
			</p>
			<p>
				Phasellus id metus magna. Fusce feugiat, tellus id bibendum ullamcorper,
				odio elit luctus nisi, nec faucibus nulla ipsum ac tellus. Sed vel
				libero euismod, pulvinar sapien vitae, fringilla odio.
			</p>
		</Container>
	);
};

export default About;
