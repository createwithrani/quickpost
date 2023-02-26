/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

/*
 * 	We need to know two things:
 * 	1. What post type are we in – so we can set up the URL to create a new post of the same type
 *	2. Is this a new post? – because if it's brand new, we don't want our button to be active, yer already in a new post, bud.
 */
export function getPostInfo() {
	const { postType } = useSelect((select) => {
		return {
			postType: select("core/editor").getCurrentPostType(),
		};
	});
	const { newPost } = useSelect((select) => {
		const newPost = select("core/editor").isEditedPostSaveable();

		return {
			newPost: newPost,
		};
	});
	return { postType, newPost };
}

export function getPostLabels(postType) {
	const { singleLabel, addNewLabel } = useSelect((select) => {
		const { getPostTypes } = select(coreStore);
		const includedPostType = [postType];
		const filteredPostTypes = getPostTypes({
			per_page: -1,
		})?.filter(({ slug }) => includedPostType.includes(slug));

		if (undefined !== filteredPostTypes && filteredPostTypes.length) {
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
	return { addNewLabel, singleLabel };
}

export function getPostTypeRestBase(postType) {
	const { rest_base } = useSelect((select) => {
		const { getPostTypes } = select(coreStore);
		const includedPostType = [postType];
		const filteredPostTypes = getPostTypes({
			per_page: -1,
		})?.filter(({ slug }) => includedPostType.includes(slug));

		if (undefined !== filteredPostTypes && filteredPostTypes.length) {
			return {
				rest_base: filteredPostTypes[0].rest_base,
			};
		}

		return {
			rest_base: undefined,
		};
	});
	return rest_base;
}

export function listenForKeyboardShortcut(event) {
	if (
		// Shortcut for Mac (Ctrl + Option + N)
		(event.ctrlKey && event.altKey && 78 === event.keyCode) ||
		// Shortcut for Windows (Alt + Shift + N)
		(event.altKey && event.shiftKey && 78 === event.keyCode)
	) {
        event.preventDefault();
    	document.querySelector('#createwithrani-quick-post-button').click();
    }
}
