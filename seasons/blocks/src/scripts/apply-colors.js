wp.domReady(function () {
	wp.blocks.registerBlockStyle("fse-pf-blocks/chat-log", {
		name: "apply-colors",
		label: "Apply Colors",
	});

	wp.hooks.addFilter(
		"blocks.getBlockAttributes",
		"my-theme/apply-colors-to-chat-log",
		function (attributes, block) {
			if (block.name !== "fse-pf-blocks/chat-log") {
				return attributes;
			}

			const chatLog = attributes.chatContent;

			if (!chatLog) {
				return attributes;
			}

			const chatLines = chatLog.split("\n");

			const coloredChatLines = chatLines.map((line, index) => {
				const colorSlug = `--wp--preset--color--${index % 11}`;
				const backgroundColor = `var(${colorSlug})`;

				return line.replace(
					/^<p>/,
					`<p style="background-color: ${backgroundColor};">`
				);
			});

			return {
				...attributes,
				chatContent: coloredChatLines.join("\n"),
			};
		}
	);
});
