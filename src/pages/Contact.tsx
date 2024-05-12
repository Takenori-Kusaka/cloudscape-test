import Button from "@cloudscape-design/components/button";
import Container from "@cloudscape-design/components/container";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import type React from "react";

const Contact: React.FC = () => {
	return (
		<Container header={<Header variant="h2">Contact Us</Header>}>
			<Form
				actions={
					<Button variant="primary" formAction="none">
						Submit
					</Button>
				}
			>
				<FormField label="Name">
					<Input value="" onChange={() => {}} />
				</FormField>
				<FormField label="Email">
					<Input value="" onChange={() => {}} />
				</FormField>
				<FormField label="Message">
					<textarea value="" onChange={() => {}} />
				</FormField>
			</Form>
		</Container>
	);
};

export default Contact;
