/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { render, useState } from "@wordpress/element";
import { subscribe } from "@wordpress/data";
import domReady from "@wordpress/dom-ready";
import AddNewPostButton from "./add-button";
import QuickPostKebabMenu from "./kebab-menu";

/**
 * Internal dependencies.
 */
import { getPostInfo, getPostLabels, getPostTypeRestBase } from "./utils";

/**
 * Create the Quick Post button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function QuickPostButton() {
	const { postType, newPost } = getPostInfo();
	if (!postType) {
		return null;
	}
	const { addNewLabel, singleLabel } = getPostLabels(postType);
	const restBase = getPostTypeRestBase(postType);
	// Until we get the label info back, we don't want to render the button.
	if (undefined !== addNewLabel && undefined !== restBase) {
		return (
			<>
				<AddNewPostButton
					postType={postType}
					newPost={newPost}
					addNewLabel={addNewLabel}
					singleLabel={singleLabel}
				/>
				<QuickPostKebabMenu
					newPost={newPost}
					singleLabel={singleLabel}
					restBase={restBase}
				/>
			</>
		);
	}
	return null;
}

/**
 * Let's subscribe (because I finally understand what this does better)
 * and add the component to the toolbar!
 */
subscribe(() => {
	const quickpostbutton = document.querySelector(
		"#createwithrani-quick-post-button-wrapper"
	);

	// If the Quick Post Button already exists, skip render
	// (which we can do because we are finally in a functional call!)
	if (quickpostbutton) {
		// quickpostbutton.remove();
		return;
	}

	domReady(() => {
		const editorToolbar = document.querySelector(
			".edit-post-header-toolbar__left"
		);

		// If toolbar doesn't exist, we can't continue
		if (!editorToolbar) {
			return;
		}

		// So turns out you can't append to an existing container without
		// using dangerouslySetInnerHTML, which..I don't want to use.
		const buttonWrapper = document.createElement("div");
		buttonWrapper.id = "createwithrani-quick-post-button-wrapper";
		buttonWrapper.style.cssText = "display:flex;";
		// Now we add the empty div to the existing toolbar element
		// so we can fill it.
		editorToolbar.appendChild(buttonWrapper);

		render(
			<QuickPostButton />,
			document.getElementById("createwithrani-quick-post-button-wrapper")
		);
	});
});
