(()=>{var t=wp.blocks.registerBlockType,__=wp.i18n.__,e=wp.blockEditor,a=e.RichText,n=e.InnerBlocks,o=e.InspectorControls,c=wp.components,r=c.PanelBody,l=c.ToggleControl;t("fse-pf-blocks/status",{title:__("Status"),icon:"format-status",category:"text",supports:{align:!0,color:{text:!0,background:!0},fontSize:!0},attributes:{content:{type:"string",source:"html",selector:"p"}},edit:function(t){var e=t.attributes,n=t.setAttributes;return React.createElement(a,{tagName:"p",value:e.content,onChange:function(t){return n({content:t})},maxLength:280,allowedFormats:[]})},save:function(t){var e=t.attributes;return React.createElement(a.Content,{tagName:"p",value:e.content})}}),t("fse-pf-blocks/aside",{title:__("Aside"),icon:"format-aside",category:"text",edit:function(){return React.createElement(n,{allowedBlocks:["core/paragraph","core/heading","core/image"]})},save:function(){return React.createElement(n.Content,null)}}),t("fse-pf-blocks/chat-log",{title:__("Chat Log"),icon:"format-chat",category:"text",attributes:{showTimestamps:{type:"boolean",default:!1},chatContent:{type:"string",source:"html",selector:".chat-log"}},edit:function(t){var e=t.attributes,n=t.setAttributes,c=e.showTimestamps,s=e.chatContent;return React.createElement(React.Fragment,null,React.createElement(o,null,React.createElement(r,{title:__("Chat Log Settings")},React.createElement(l,{label:__("Show Timestamps"),checked:c,onChange:function(){return n({showTimestamps:!c})}}))),React.createElement(a,{tagName:"div",multiline:"p",className:"chat-log",value:s,onChange:function(t){return n({chatContent:t})},placeholder:__("Paste the chat log here...")}))},save:function(t){var e=t.attributes;return React.createElement(a.Content,{tagName:"div",className:"chat-log",value:e.chatContent})}})})();