/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { renderToString, useState } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";
import { registerPlugin } from "@wordpress/plugins";

const AddNewPostButton = () => {
	const { postType } = useSelect((select) => {
		return {
			postType: select("core/editor").getCurrentPostType(),
		};
	});

	if (!postType) {
		return null;
	}
	const { newState, setNewState } = useState(true);
	const { newPost } = useSelect((select) => {
		const newPost = select("core/editor").isCleanNewPost();

		return {
			newPost: newPost,
		};
	});
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

	if (undefined !== addNewLabel) {
		const ButtonElement = newPost ? "button" : "a";
		const AddButton = (
			<ButtonElement
				class="components-button is-secondary"
				id="createwithrani-add-new-button"
				href={addQueryArgs("post-new.php", {
					post_type: postType,
				})}
				style={{
					textTransform: "capitalize",
					margin: "0 1em",
					display: "block",
					maxHeight: "36px",
					minHeight: "36px",
					display: "flex",
				}}
				aria-disabled={newPost}
			>
				<span>
					{sprintf(
						/* translators: %1$s: the phrase "Add New", %2$s: Name of current post type. */
						__("%1$s %2$s", "createwithrani-quick-post-button"),
						addNewLabel,
						singleLabel
					)}
				</span>
			</ButtonElement>
		);
		const paintbutton = () => {
			if (!document.querySelector(".edit-post-header-toolbar__left")) {
				return;
			}
			if (document.getElementById("createwithrani-add-new-button")) {
				var existingButton = document.getElementById(
					"createwithrani-add-new-button"
				);
				existingButton.remove();
			}
			document
				.querySelector(".edit-post-header-toolbar__left")
				.insertAdjacentHTML("beforeend", renderToString(AddButton));
		};

		requestAnimationFrame(paintbutton);
	}
	return null;
};

registerPlugin("createwithrani-quick-post-button", {
	render: AddNewPostButton,
});
