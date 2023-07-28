// Description: Gutenberg block script for the Status block.

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl, ColorPalette } = wp.components;

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
				placeholder={__("Add your status here...")}
			/>
		);
	},

	save({ attributes }) {
		return <RichText.Content tagName="p" value={attributes.content} />;
	},
});

// Description: Gutenberg block script for the Aside block.

registerBlockType("fse-pf-blocks/aside", {
	title: __("Aside"),
	icon: "format-aside",
	category: "text",

	edit() {
		return (
			<aside>
				<InnerBlocks
					allowedBlocks={[
						"core/paragraph",
						"core/list",
						"core/heading",
						"core/image",
					]}
					template={[
						[
							"core/paragraph",
							{ placeholder: "Add your aside content here..." },
						],
					]}
					templateLock={false}
				/>
			</aside>
		);
	},

	save() {
		return (
			<aside>
				<InnerBlocks.Content />
			</aside>
		);
	},
});
// Description: Gutenberg block script for the Chat Log block.
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
		speakersColors: {
			type: "object",
			default: {},
		},
	},
	edit({ attributes, setAttributes }) {
		const { showTimestamps, chatContent, speakersColors } = attributes;

		// Extract speakers from chat content
		const extractSpeakersFromChatContent = (content) => {
			const speakers = new Set();
			const speakerRegex = /<p class="speaker-(\d+)">/g;
			let match;
			while ((match = speakerRegex.exec(content))) {
				const speakerClass = match[0];
				speakers.add(speakerClass);
			}
			return Array.from(speakers);
		};
		const speakers = extractSpeakersFromChatContent(chatContent);

		// Get color palette from theme.json
		const colorPalette = wp.data
			.select("core/block-editor")
			.getSettings().colors;

		// Handle speaker colors
		const handleSpeakerColorChange = (speaker, color) => {
			const newSpeakersColors = { ...speakersColors };
			newSpeakersColors[speaker] = color;
			setAttributes({ speakersColors: newSpeakersColors });
		};

		// Render speaker color controls
		const renderSpeakerColorControls = () => {
			if (!speakers.length) {
				return null;
			}
			return (
				<PanelBody title={__("Speaker Colors")} initialOpen={false}>
					{speakers.map((speaker, index) => (
						<ColorPalette
							key={index}
							colors={colorPalette}
							value={speakersColors[speaker]}
							onChange={(color) => handleSpeakerColorChange(speaker, color)}
							disableCustomColors={true}
						/>
					))}
				</PanelBody>
			);
		};

		return (
			<div>
				<InspectorControls>
					{/* ... (existing code remains the same) */}
				</InspectorControls>
				<table className="chat-log-block chat-log-wrapper">
					<tbody>
						<tr>
							<td className="timestamp">
								<RichText
									tagName="p"
									value={"Timestamp"}
									allowedFormats={[]}
									withoutInteractiveFormatting={true}
								/>
							</td>
							<td className="speaker">
								<RichText
									tagName="p"
									value={"Speaker"}
									allowedFormats={[]}
									withoutInteractiveFormatting={true}
								/>
							</td>
							<td className="message">
								<RichText
									tagName="div"
									value={chatContent}
									onChange={(content) =>
										setAttributes({ chatContent: content })
									}
									allowedFormats={[]}
									placeholder={__("Add your chat log here...")}
									withoutInteractiveFormatting={true}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	},
	save({ attributes }) {
		const { chatContent } = attributes;

		return (
			<table className="chat-log-block chat-log-wrapper">
				<tbody>
					<tr>
						<td className="timestamp">
							<RichText.Content tagName="p" value={"Timestamp"} />
						</td>
						<td className="speaker">
							<RichText.Content tagName="p" value={"Speaker"} />
						</td>
						<td className="message">
							<RichText.Content tagName="div" value={chatContent} />
						</td>
					</tr>
				</tbody>
			</table>
		);
	},
});
