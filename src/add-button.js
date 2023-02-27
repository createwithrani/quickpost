/**
 * WordPress dependencies.
 */
import { __ } from "@wordpress/i18n";
import { Tooltip, Spinner } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import { useState } from "@wordpress/element";

/**
 * Create the Quick Post Button we will add to the Block Editor Toolbar
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function AddNewPostButton({ postType, newPost, addNewLabel, singleLabel }) {
	const [click, setClick] = useState(false);
	const platform =
		navigator?.userAgentData?.platform || navigator?.platform || "unknown";
	const isMac = platform.indexOf("Mac") > -1;
	const isWindows = platform.indexOf("Win") > -1;
	const isLinux = platform.indexOf("Linux") > -1;

	function getAriaLabel() {
		if (isMac) {
			return __("Ctrl + Option + N", "createwithrani-quickpost");
		} else if (isWindows || isLinux) {
			return __("Alt + Shift + N", "createwithrani-quickpost");
		} else if (isLinux) {
			return __("Alt + Shift + N", "createwithrani-quickpost");
		}
	}

	return (
		<Tooltip text={getAriaLabel()}>
			<a
				className="components-button components-toolbar__control is-secondary"
				id="createwithrani-quick-post-button"
				aria-label={getAriaLabel()}
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
				role="link"
				disabled={!newPost}
				aria-disabled={!newPost}
				href={addQueryArgs("post-new.php", {
					post_type: postType,
				})}
				onClick={() => setClick(true)}
			>
				<span>
					{sprintf(
						/* translators: %1$s: Name of current post type. */
						__("Add new %1$s", "createwithrani-quickpost"),
						singleLabel
					)}
				</span>
				{click && <Spinner />}
			</a>
		</Tooltip>
	);
}

export default AddNewPostButton;
