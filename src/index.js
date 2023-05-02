/**
 * WordPress dependencies.
 */
import { render } from "@wordpress/element";
import { subscribe } from "@wordpress/data";
import { registerPlugin } from "@wordpress/plugins";
import domReady from "@wordpress/dom-ready";

/**
 * Internal dependencies.
 */
import QuickPostButton from "./quick-post";
import ViewPostButton from "./view-post-button";
import { listenForKeyboardShortcut, insertAfter } from "./utils";
import { QuickPostPreferences } from "./quickpost-preferences";

registerPlugin("createwithrani/quickpost-preferences", {
	render: QuickPostPreferences,
});

/**
 * Let's subscribe (because I finally understand what this does better)
 * and add the component to the toolbar!
 */
subscribe(() => {
	const quickpostbutton = document.querySelector(
		"#createwithrani-quick-post-button-wrapper"
	);
	const viewpostbutton = document.querySelector(
		"#createwithrani-view-post-button-wrapper"
	);

	// If the Quick Post Button already exists, skip render
	if (quickpostbutton) {
		return;
	} else {
		domReady(() => {
			const editorToolbar = document.querySelector(
				".edit-post-header__toolbar"
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

			// add empty div to the toolbar so we can fill it.
			editorToolbar.appendChild(buttonWrapper);

			render(
				<QuickPostButton visibility={true} />,
				document.getElementById(
					"createwithrani-quick-post-button-wrapper"
				)
			);
		});
	}

	// If the View Post Button already exists, skip render
	if (viewpostbutton) {
		return;
	} else {
		domReady(() => {
			const editorToolbarSettings = document.querySelector(
				".edit-post-header__settings"
			);
			const viewButtonWrapper = document.createElement("div");
			viewButtonWrapper.id = "createwithrani-view-post-button-wrapper";
			viewButtonWrapper.style.cssText = "display:flex;";

			// If toolbar doesn't exist, we can't continue
			if (!editorToolbarSettings) {
				return;
			}

			// add empty div to the toolbar so we can fill it.
			insertAfter(editorToolbarSettings.children[1], viewButtonWrapper);

			render(
				<ViewPostButton />,
				document.getElementById(
					"createwithrani-view-post-button-wrapper"
				)
			);
		});
	}
});

document.addEventListener("keydown", listenForKeyboardShortcut);
