//wp.data.select("core/editor").getEditedPostAttribute("id")
//wp.data.select("core").getEntityRecord('postType', 'post', 96)
//wp.data.select("core/editor").getEditedPostContent()
//wp.data.select("core/editor").getCurrentPost()
/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { Dropdown, Button } from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";

/**
 * Create the kebab menu for the Quick Post Button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function QuickPostKebabMenu({ postType, newPost, addNewLabel, singleLabel }) {
	return (
		<Dropdown
			style={{}}
			id="createwithrani-add-new-button"
			contentClassName="createwithrani-add-new-button-popover"
			position="bottom left"
			renderToggle={({ isOpen, onToggle }) => (
				<Button
					disabled={newPost}
					aria-disabled={newPost}
					isSecondary
					aria-expanded={isOpen}
					onClick={onToggle}
					icon={moreVertical}
					iconPosition="right"
					label={sprintf(
						/* translators: %1$s: the phrase "Add New",
							  %2$s: Name of current post type. */
						__("%1$s %2$s", "createwithrani-quick-post-button"),
						addNewLabel,
						singleLabel
					)}
					style={{
						marginLeft: "-1px",
						borderTopLeftRadius: "0px",
						borderBottomLeftRadius: "0px",
						display: "block",
						maxHeight: "36px",
						minHeight: "36px",
					}}
				></Button>
			)}
			renderContent={() => (
				<MenuGroup>
					<MenuItem>Up</MenuItem>
				</MenuGroup>
			)}
		/>
	);
}

export default QuickPostKebabMenu;
