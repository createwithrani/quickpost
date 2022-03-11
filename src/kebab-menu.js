/**
 * External dependencies
 */
import classnames from "classnames";

/**
 * WordPress dependencies.
 */
import { DropdownMenu } from "@wordpress/components";
import { moreVertical } from "@wordpress/icons";

/**
 * Internal dependencies.
 */
import { DuplicateMenuItem } from "./duplicate-menu-item";
import "./editor.scss";

const POPOVER_PROPS = {
	className: classnames("createwithrani-quick-post-button-popover"),
	position: "bottom left",
};

/**
 * Create the kebab menu for the Quick Post Button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button kebab menu
 */
function QuickPostKebabMenu({ newPost, restBase, singleLabel }) {
	const toggleProps = {
		isSecondary: true,
		disabled: !newPost,
		style: {
			borderTopLeftRadius: "0px",
			borderBottomLeftRadius: "0px",
			marginLeft: "-1px",
			maxHeight: "36px",
			minHeight: "36px",
			maxWidth: "36px",
			minWidth: "36px",
			display: "block",
			padding: "0px",
		},
	};

	return (
		<>
			<DropdownMenu
				className="createwithrani-quick-post-kebab"
				popoverProps={POPOVER_PROPS}
				toggleProps={toggleProps}
				icon={moreVertical}
			>
				{() => (
					<DuplicateMenuItem
						singleLabel={singleLabel}
						restBase={restBase}
					/>
				)}
			</DropdownMenu>
		</>
	);
}
export default QuickPostKebabMenu;
