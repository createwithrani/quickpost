/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { Tooltip, Spinner } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { getPostInfo, getPostLabels } from "./utils";

function ViewPostButton() {
	const { postType, newPost } = getPostInfo();

	if (!postType) {
		return null;
	}
	const { postData } = useSelect((select) => {
		return {
			postData: select("core/editor").getCurrentPost(),
		};
	});

	const postPermalink =
		"publish" === postData.status
			? postData.link
			: addQueryArgs(postData.link, { preview: true });

	const ViewPostButton = () => {
		return (
			<a
				className="components-button components-toolbar__control is-tertiary"
				id="createwithrani-view-post-button"
				style={{
					textTransform: "capitalize",
					display: "block",
					maxHeight: "36px",
					minHeight: "36px",
					display: "flex",
					borderTopRightRadius: "0px",
					borderBottomRightRadius: "0px",
				}}
				role="link"
				href={postPermalink}
				target="_blank"
			>
				<span>{__("View", "createwithrani-quickpost")}</span>
			</a>
		);
	};
	return newPost && <ViewPostButton />;
}

export default ViewPostButton;
