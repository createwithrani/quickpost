/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies
 */
import { sprintf, __ } from "@wordpress/i18n";
import {
	__experimentalGetBlockLabel as getBlockLabel,
	getBlockType,
} from "@wordpress/blocks";
import { useSelect } from "@wordpress/data";
import {
	Dropdown,
	Button,
	VisuallyHidden,
	__experimentalText as Text,
	ExternalLink,
} from "@wordpress/components";
import { chevronDown } from "@wordpress/icons";
import { useRef } from "@wordpress/element";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { getPostTitle, getPostInfo } from "./utils";

/**
 * @param {Object}   props                Props for the DocumentActions component.
 * @param {string}   props.entityTitle    The title to display.
 * @param {string}   props.postType    A label to use for entity-related options.
 *                                        E.g. "template" would be used for "edit
 *                                        template" and "show template details".
 * @param {boolean}  props.isLoaded       Whether the data is available.
 * @param {Function} props.children       React component to use for the
 *                                        information dropdown area. Should be a
 *                                        function which accepts dropdown props.
 * @param {boolean}  props.showIconLabels Whether buttons display icons or text labels.
 */
export default function QuickPostViewButton() {
	const entityTitle = getPostTitle();
	const { postType, newPost, link, status } = getPostInfo();
	// The title ref is passed to the popover as the anchorRef so that the
	// dropdown is centered over the whole title area rather than just one
	// part of it.
	const titleRef = useRef();

	// Return feedback that the post title doesn't exist yet
	if (!entityTitle) {
		return <div className="quick-post-view-button">{__("Untitled")}</div>;
	}

	return (
		<div className={classnames("quick-post-view-button")}>
			<div
				ref={titleRef}
				className="quick-post-view-button__title-wrapper"
			>
				<Text
					size="body"
					className="quick-post-view-button__title"
					as="h1"
				>
					<VisuallyHidden as="span">
						{sprintf(
							/* translators: %s: the entity being edited, like "post"*/
							__("Editing %s: "),
							postType
						)}
					</VisuallyHidden>
					{entityTitle}
				</Text>
				{status && status === "publish" && (
					<Dropdown
						popoverProps={{
							anchorRef: titleRef.current,
							position: "bottom center",
						}}
						renderToggle={({ isOpen, onToggle }) => (
							<Button
								className="quick-post-view-button__get-info"
								icon={chevronDown}
								aria-expanded={isOpen}
								aria-haspopup="true"
								onClick={onToggle}
								label={sprintf(
									/* translators: %s: the entity to see details about, like "post"*/
									__("Show %s details"),
									postType
								)}
							/>
						)}
						contentClassName="quick-post-view-button__info-dropdown"
						renderContent={() => (
							<ExternalLink href={link}>
								{__("View Post")}
							</ExternalLink>
						)}
					/>
				)}
			</div>
		</div>
	);
}
