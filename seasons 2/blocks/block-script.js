// Description: Gutenberg block script for the Status block.

const { registerBlockType, createBlock } = wp.blocks;
const { __ } = wp.i18n;
const { RichText } = wp.editor;

registerBlockType('fse-pf-blocks/status', {
    title: __('Status'),
    icon: 'format-status',
    category: 'common',
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
            type: 'string',
            source: 'html',
            selector: 'p',
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

const { InnerBlocks } = wp.editor;

registerBlockType('fse-pf-blocks/aside', {
    title: __('Aside'),
    icon: 'format-aside',
    category: 'common',

    edit() {
        return <InnerBlocks allowedBlocks={['core/paragraph', 'core/heading', 'core/image']} />;
    },

    save() {
        return <InnerBlocks.Content />;
    },
});

// Description: Gutenberg block script for the Chat Log block.

const { InspectorControls } = wp.editor;
const { PanelBody, ToggleControl } = wp.components;

registerBlockType('fse-pf-blocks/chat-log', {
    title: __('Chat Log'),
    icon: 'format-chat',
    category: 'common',
    attributes: {
        showTimestamps: {
            type: 'boolean',
            default: false,
        },
        chatContent: {
            type: 'string',
            source: 'html',
            selector: '.chat-log',
        },
    },

    edit({ attributes, setAttributes }) {
        const { showTimestamps, chatContent } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Chat Log Settings')}>


