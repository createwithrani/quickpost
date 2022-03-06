/**
 * WordPress dependencies
 */
import { withFilters } from "@wordpress/components";

/**
 * Internal dependencies.
 */
import { getPostInfo, getPostLabels, getPostTypeRestBase } from "./utils";
import AddNewPostButton from "./add-button";
import QuickPostKebabMenu from "./kebab-menu";

/**
 * Create the Quick Post button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function QuickPostButton({ visibility }) {
	const { postType, newPost } = getPostInfo();
	if (!postType) {
		return null;
	}
	const { addNewLabel, singleLabel } = getPostLabels(postType);
	const restBase = getPostTypeRestBase(postType);
	// Until we get the label info back, we don't want to render the button.
	if (undefined !== addNewLabel && undefined !== restBase && visibility) {
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
const QuickPostButtoWithFilters = withFilters("QuickPost.Display")(
	QuickPostButton
);
export default QuickPostButtoWithFilters;
