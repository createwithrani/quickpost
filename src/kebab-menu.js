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
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { addQueryArgs } from "@wordpress/url";

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
	const [postId, setPostId] = useState(0);
	const { currentPostData } = useSelect((select) => {
		return {
			currentPostData: select("core/editor").getCurrentPost(),
		};
	});

	const DuplicatePost = {
		author: currentPostData.author,
		content: currentPostData.content,
		title: "Copy of " + currentPostData.title,
		excerpt: currentPostData.excerpt,
		comment_status: currentPostData.comment_status,
		ping_status: currentPostData.ping_status,
		password: currentPostData.password,
		parent: currentPostData.parent,
		menu_order: currentPostData,
		meta: currentPostData.meta,
	};
	useEffect(() => {
		apiFetch({
			path: "wp/v2/posts",
			method: "POST",
			data: DuplicatePost,
		}).then((data) => {
			setPostId(data.id);
		});
	}, [currentPostData]);
	function goToDuplicatePost() {
		if (0 !== postId) {
			return addQueryArgs("post.php", {
				post: postId,
				action: "edit",
			});
		}
	}
	return (
		<DropdownMenu
			className="createwithrani-quick-post-kebab"
			popoverProps={popoverProps}
			toggleProps={toggleProps}
			icon={moreVertical}
		>
			{() => (
				<MenuGroup>
					<MenuItem
						onClick={() => (location.href = goToDuplicatePost())}
					>
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
//onClick={() => (location.href = duplicatedData)}
export default QuickPostKebabMenu;
