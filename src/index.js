/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSelect, withSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";
import { renderToString } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";
import { registerPlugin } from "@wordpress/plugins";

const AddNewPostButton = ({ postType }) => {
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
	if (undefined !== addNewLabel) {
		const AddButton = (
			<a
				class="components-button is-secondary"
				id="createwithrani-add-new-button"
				href={addQueryArgs("post-new.php", {
					post_type: postType,
				})}
				style={{
					textTransform: "capitalize",
					margin: "0 1em",
				}}
			>
				<span>
					{sprintf(
						/* translators: %1$s: the phrase "Add New", %2$s: Name of current post type. */
						__("%1$s %2$s", "createwithrani-add-new-post"),
						addNewLabel,
						singleLabel
					)}
				</span>
			</a>
		);
		requestAnimationFrame(() => {
			if (!document.querySelector(".edit-post-header-toolbar__left")) {
				return;
			}
			// Redundant extra check added because of a bug where the above check wasn't working, credit: Extendify plugin
			if (document.getElementById("createwithrani-add-new-button")) {
				return;
			}
			document
				.querySelector(".edit-post-header-toolbar__left")
				.insertAdjacentHTML("beforeend", renderToString(AddButton));
		});
	}

	return null;
};
const AddNewPostButtonWrapped = withSelect((select) => {
	return {
		postType: select("core/editor").getCurrentPostType(),
	};
})(AddNewPostButton);

registerPlugin("createwithrani-add-new-post", {
	render: AddNewPostButtonWrapped,
});
