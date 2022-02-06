/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";

/**
 * Create the Quick Post Button we will add to the Block Editor Toolbar
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function AddNewPostButton({ postType, newPost, addNewLabel, singleLabel }) {
	return (
		<Button
			isSecondary
			id="createwithrani-quick-post-button"
			style={{
				textTransform: "capitalize",
				margin: "0 0 0 1em",
				display: "block",
				maxHeight: "36px",
				minHeight: "36px",
				display: "flex",
				borderTopRightRadius: "0px",
				borderBottomRightRadius: "0px",
			}}
			disabled={!newPost}
			aria-disabled={!newPost}
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

export default AddNewPostButton;
