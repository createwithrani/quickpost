/**
 * WordPress dependencies
 */
import domReady from "@wordpress/dom-ready";
import { subscribe, select } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { addQueryArgs } from "@wordpress/url";
import { renderToString } from "@wordpress/element";

domReady(() => {
	if (window._wpLoadBlockEditor) {
		window._wpLoadBlockEditor.then(function () {
			// I should be able to combine these two constants, right? This feels oddly redundant and weird. I must be missing something.
			const unsubscribe = subscribe(() => {
				const postType = select("core/editor").getCurrentPostType();
				if (!postType) {
					return null;
				}
			});
			const AddButton = subscribe(() => {
				const postType = select("core/editor").getCurrentPostType();
				if (!postType) {
					return null;
				}
				unsubscribe();
				const addButton = (
					<a
						class="components-button is-secondary"
						id="createwithrani-add-new-button"
						href={addQueryArgs("post-new.php", {
							post_type: postType,
						})}
						style={{
							textTransform: "capitalize",
						}}
					>
						{__(`Add New ${postType}`, "wordpress")}
					</a>
				);

				requestAnimationFrame(() => {
					if (!document.querySelector(".edit-post-header-toolbar")) {
						return;
					}
					// Redundant extra check added because of a bug where the above check wasn't working, credit: Extendify plugin
					if (
						document.getElementById("createwithrani-add-new-button")
					) {
						return;
					}
					document
						.querySelector(".edit-post-header-toolbar")
						.insertAdjacentHTML(
							"beforeend",
							renderToString(addButton)
						);
					AddButton();
				});
			});
		});
	}
});
