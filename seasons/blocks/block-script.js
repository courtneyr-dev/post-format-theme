// Description: Gutenberg block script for the Status block.

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;

registerBlockType("fse-pf-blocks/status", {
	title: __("Status"),
	icon: "format-status",
	category: "text",
	supports: {
		align: true,
		color: {
			text: true,
			background: true,
		},
		fontSize: true,
	},
	attributes: {
		content: {
			type: "string",
			source: "html",
			selector: "p",
		},
	},

	edit({ attributes, setAttributes }) {
		return (
			<RichText
				tagName="p"
				value={attributes.content}
				onChange={(content) => setAttributes({ content })}
				maxLength={280}
				allowedFormats={[]}
			/>
		);
	},

	save({ attributes }) {
		return <RichText.Content tagName="p" value={attributes.content} />;
	},
});

// Description: Gutenberg block script for the Aside block.

const { InnerBlocks } = wp.blockEditor;

registerBlockType("fse-pf-blocks/aside", {
	title: __("Aside"),
	icon: "format-aside",
	category: "text",

	edit() {
		return (
			<InnerBlocks
				allowedBlocks={["core/paragraph", "core/heading", "core/image"]}
			/>
		);
	},

	save() {
		return <InnerBlocks.Content />;
	},
});

// Description: Gutenberg block script for the Chat Log block.

// Chat log block
registerBlockType("fse-pf-blocks/chat-log", {
	title: __("Chat Log"),
	icon: "format-chat",
	category: "text",
	attributes: {
		showTimestamps: {
			type: "boolean",
			default: false,
		},
		chatContent: {
			type: "string",
			source: "html",
			selector: ".chat-log",
		},
	},

	edit({ attributes, setAttributes }) {
		const { showTimestamps, chatContent } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title={__("Chat Log Settings")}>
						<ToggleControl
							label={__("Show Timestamps")}
							checked={showTimestamps}
							onChange={() =>
								setAttributes({ showTimestamps: !showTimestamps })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<RichText
					tagName="div"
					multiline="p"
					className="chat-log"
					value={chatContent}
					onChange={(newContent) => setAttributes({ chatContent: newContent })}
					placeholder={__("Paste the chat log here...")}
				/>
			</>
		);
	},

	save({ attributes }) {
		return (
			<RichText.Content
				tagName="div"
				className="chat-log"
				value={attributes.chatContent}
			/>
		);
	},
});
