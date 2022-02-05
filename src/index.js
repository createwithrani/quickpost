/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { render } from "@wordpress/element";
import { subscribe, useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { Button } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import domReady from "@wordpress/dom-ready";

/**
 * Create the Quick Post Button we will add to the Block Editor Toolbar
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function AddNewPostButton() {
	/*
	 * 	We need to know two things:
	 * 	1. What post type are we in – so we can set up the URL to create a new post of 	*	the same type
	 *	2. Is this a new post? – because if it's brand new, we don't want our button to *	be active, yer already in a new post, bud.
	 */
	const { postType } = useSelect((select) => {
		return {
			postType: select("core/editor").getCurrentPostType(),
		};
	});
	const { newPost } = useSelect((select) => {
		const newPost = select("core/editor").isCleanNewPost();

		return {
			newPost: newPost,
		};
	});

	// don't run if the postType data hasn't gotten back to us yet
	if (!postType) {
		return null;
	}

	const { singleLabel, addNewLabel } = useSelect((select) => {
		const { getPostTypes } = select(coreStore);
		const includedPostType = [postType];
		const filteredPostTypes = getPostTypes({ per_page: -1 })?.filter(
			({ viewable, slug }) => viewable && includedPostType.includes(slug)
		);
		if (undefined !== filteredPostTypes) {
			return {
				addNewLabel: filteredPostTypes[0].labels.add_new,
				singleLabel: filteredPostTypes[0].labels.singular_name,
			};
		}

		return {
			addNewLabel: undefined,
			singleLabel: undefined,
		};
	});

	// Basically don't run till we get all our data from the HoC
	if (undefined !== addNewLabel) {
		return (
			<Button
				className="components-button is-secondary"
				id="createwithrani-add-new-button"
				style={{
					textTransform: "capitalize",
					margin: "0 1em",
					display: "block",
					maxHeight: "36px",
					minHeight: "36px",
					display: "flex",
				}}
				disabled={newPost}
				/* do I still need the aria explicitly?
				 check if component adds it on its own */
				aria-disabled={newPost}
				onClick={() =>
					(location.href = addQueryArgs("post-new.php", {
						post_type: postType,
					}))
				}
			>
				<span>
					{sprintf(
						/* translators: %1$s: the phrase "Add New",
						 %2$s: Name of current post type. */
						__("%1$s %2$s", "createwithrani-quick-post-button"),
						addNewLabel,
						singleLabel
					)}
				</span>
			</Button>
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
		"#createwithrani-add-new-button-wrapper"
	);

	// If the Quick Post Button already exists, skip render
	// (which we can do because we are finally in a functional call!)
	if (quickpostbutton) {
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
		buttonWrapper.id = "createwithrani-add-new-button-wrapper";

		// Now we add the empty div to the existing toolbar element
		// so we can fill it.
		editorToolbar.appendChild(buttonWrapper);

		render(
			<AddNewPostButton />,
			document.getElementById("createwithrani-add-new-button-wrapper")
		);
	});
});
