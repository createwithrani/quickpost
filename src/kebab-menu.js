/**
 * External dependencies
 */
import classnames from "classnames";
import axios from "axios";

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
import { Spinner } from "@wordpress/components";
import "./editor.scss";

const POPOVER_PROPS = {
	className: classnames("createwithrani-quick-post-button-popover"),
	position: "bottom left",
};

/**
 * Create the kebab menu for the Quick Post Button
 *
 * @since 0.1.0
 * @return {string} Return the rendered Quick Post Button
 */
function QuickPostKebabMenu({ newPost, restBase, singleLabel }) {
	const [postId, setPostId] = useState(0);
	const [duplicationStatus, setDuplicationStatus] = useState(false);
	const { currentPostData } = useSelect((select) => {
		return {
			currentPostData: select("core/editor").getCurrentPost(),
		};
	});
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
	const fetchData = async () => {
		const response = await apiFetch({
			path: `wp/v2/${restBase}`,
			method: "POST",
			data: DuplicatePost,
		});
		setPostId(response.id);
	};
	const DuplicatePost = {
		author: currentPostData.author,
		content: currentPostData.content,
		title: "Copy of " + currentPostData.title,
		excerpt: currentPostData.excerpt,
		comment_status: currentPostData.comment_status,
		ping_status: currentPostData.ping_status,
		password: currentPostData.password,
		parent: currentPostData.parent,
		menu_order: currentPostData.menu_order,
		meta: currentPostData.meta,
	};
	function DuplicateThePost() {
		setDuplicationStatus(true);
		fetchData();
	}

	useEffect(() => {
		if (0 !== postId) {
			location.href = addQueryArgs("post.php", {
				post: postId,
				action: "edit",
			});
		}
	}, [postId]);
	return (
		<DropdownMenu
			className="createwithrani-quick-post-kebab"
			popoverProps={POPOVER_PROPS}
			toggleProps={toggleProps}
			icon={moreVertical}
		>
			{() => (
				<MenuGroup>
					<MenuItem
						onClick={DuplicateThePost}
						className="createwithrani-quick-post-duplicate-menu-item"
					>
						{sprintf(
							/* translators: %s: singular label of current post type i.e Page, Post */
							__(
								"Duplicate %s",
								"createwithrani-quick-post-button"
							),
							singleLabel
						)}

						{duplicationStatus && <Spinner />}
					</MenuItem>
				</MenuGroup>
			)}
		</DropdownMenu>
	);
}
export default QuickPostKebabMenu;
