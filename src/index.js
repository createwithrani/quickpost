/**
 * WordPress dependencies.
 */
import { render } from "@wordpress/element";
import { subscribe } from "@wordpress/data";
import domReady from "@wordpress/dom-ready";

/**
 * Internal dependencies.
 */
import QuickPostButton from "./quick-post";
import QuickPostViewButton from "./view-post";

/**
 * Let's subscribe (because I finally understand what this does better)
 * and add the component to the toolbar!
 */
subscribe(() => {
	const quickpostbutton = document.querySelector(
		"#createwithrani-quick-post-button-wrapper"
	);

	// If the Quick Post Button already exists, skip render
	if (quickpostbutton) {
		return;
	}

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
			document.getElementById("createwithrani-quick-post-button-wrapper")
		);
	});
});

subscribe(() => {
	const quickPostViewButton = document.querySelector(
		"#createwithrani-quick-post-view-button-wrapper"
	);

	// If the Quick Post Button already exists, skip render
	if (quickPostViewButton) {
		return;
	}

	domReady(() => {
		const editorToolbar = document.querySelector(".edit-post-header");

		// If toolbar doesn't exist, we can't continue
		if (!editorToolbar) {
			return;
		}

		// So turns out you can't append to an existing container without
		// using dangerouslySetInnerHTML, which..I don't want to use.
		const viewButtonWrapper = document.createElement("div");
		viewButtonWrapper.id = "createwithrani-quick-post-view-button-wrapper";
		viewButtonWrapper.style.cssText = "display:flex;";

		// add empty div to the toolbar so we can fill it.
		editorToolbar.appendChild(viewButtonWrapper);

		render(
			<QuickPostViewButton visibility={true} />,
			document.getElementById(
				"createwithrani-quick-post-view-button-wrapper"
			)
		);
	});
});
