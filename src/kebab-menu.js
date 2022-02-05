//wp.data.select("core/editor").getEditedPostAttribute("id")
//wp.data.select("core").getEntityRecord('postType', 'post', 96)
//wp.data.select("core/editor").getEditedPostContent()
//wp.data.select("core/editor").getCurrentPost()

/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { DropdownMenu, MenuGroup, MenuItem } from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";

/**
 * Create the kebab menu for the Quick Post Button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function QuickPostKebabMenu({ newPost, singleLabel }) {
	const popoverProps = {
		className: classnames("createwithrani-quick-post-button-popover"),
		position: "bottom left",
	};
	const toggleProps = {
		isSecondary: true,
		disabled: !newPost,
		style: {
			borderTopLeftRadius: "0px",
			borderBottomLeftRadius: "0px",
			marginLeft: "-1px",
			maxHeight: "36px",
			minHeight: "36px",
			display: "block",
		},
	};
	return (
		<DropdownMenu
			className="createwithrani-quick-post-kebab"
			popoverProps={popoverProps}
			toggleProps={toggleProps}
			icon={moreVertical}
		>
			{() => (
				<MenuGroup>
					<MenuItem>
						{sprintf(
							/* translators: %s: singular label of current post type i.e Page, Post */
							__(
								"Duplicate %s",
								"createwithrani-quick-post-button"
							),
							singleLabel
						)}
					</MenuItem>
				</MenuGroup>
			)}
		</DropdownMenu>
	);
}

export default QuickPostKebabMenu;
