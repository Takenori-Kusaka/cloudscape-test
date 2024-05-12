import {
	AppLayout,
	BreadcrumbGroup,
	Container,
	ContentLayout,
	Flashbar,
	Header,
	HelpPanel,
	Icon,
	Link,
	SideNavigation,
	SplitPanel,
} from "@cloudscape-design/components";
import { I18nProvider } from "@cloudscape-design/components/i18n";
import messages from "@cloudscape-design/components/i18n/messages/all.en";
import React from "react";

const LOCALE = "ja";

export default function () {
	const [overview, setOverview] = React.useState(false);

	return (
		<I18nProvider locale={LOCALE} messages={[messages]}>
			<AppLayout
				/*
        breadcrumbs={
          <BreadcrumbGroup
            items={[
              { text: 'Home', href: '#' },
              { text: 'Service', href: '#' },
            ]}
          />
        }*/
				contentType="dashboard"
				disableContentPaddings={false}
				navigationOpen={true}
				navigation={
					<SideNavigation
						header={{
							href: "#",
							text: "Management Dashboard",
						}}
						items={[{ type: "link", text: `Excel Viwer`, href: `#` }]}
					/>
				}
				/* notifications={
          <Flashbar
            items={[
              {
                type: 'info',
                dismissible: true,
                content: 'This is an info flash message.',
                id: 'message_1',
              },
            ]}
          />
        } */
				toolsOpen={true}
				tools={
					<HelpPanel
						footer={
							<div>
								<h3>
									Learn more <Icon name="external" />
								</h3>
								<ul>
									<li>
										<a href="">Link to documentation</a>
									</li>
									<li>
										<a href="">Link to documentation</a>
									</li>
								</ul>
							</div>
						}
						header={<h2>Help panel title (h2)</h2>}
					>
						<div>
							<p>
								This is a paragraph with some <b>bold text</b> and also some{" "}
								<i>italic text</i>.
							</p>

							<h3>h3 section header</h3>
							<ul>
								<li>Unordered list item.</li>
								<li>Unordered list item.</li>
							</ul>

							<h4>h4 section header</h4>
							<p>
								Code can be formatted as lines of code or blocks of code. Add
								inline code <code>like this</code> using a{" "}
								<code>{"<code>"}</code> tag.
								<pre>
									Or format blocks of code (like this) using a{" "}
									<code>{"<pre>"}</code> tag.
								</pre>
							</p>

							<h5>h5 section header</h5>
							<dl>
								<dt>This is a term</dt>
								<dd>This is its description.</dd>
								<dt>This is a term</dt>
								<dd>This is its description</dd>
							</dl>
						</div>
					</HelpPanel>
				}
				content={
					<ContentLayout
						header={
							<Header variant="h1" info={<Link variant="info">Info</Link>}>
								Excel Viewer
							</Header>
						}
					>
						<Container
							header={
								<Header variant="h2" description="Container description">
									Container header
								</Header>
							}
						>
							<div className="contentPlaceholder" />
						</Container>
					</ContentLayout>
				}
				/*splitPanel={<SplitPanel header="Split panel header">Split panel content</SplitPanel>}*/
			/>
		</I18nProvider>
	);
}
