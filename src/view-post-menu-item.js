/**
 * WordPress dependencies.
 */
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { MenuItem, ToolbarItem } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState } from "@wordpress/element";
import { Spinner, ExternalLink } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies.
 */
import { getPostInfo } from "./utils";
import "./editor.scss";

export function ViewPostMenuItem() {
	const { link, status } = getPostInfo();
	const ViewPostItem = () => {
		return (
			<ExternalLink
				className="createwithrani-mobile-view-post components-button components-menu-item__button"
				href={link}
			>
				{__("View Post")}
			</ExternalLink>
		);
	};
	return status && status === "publish" && <ViewPostItem />;
}
