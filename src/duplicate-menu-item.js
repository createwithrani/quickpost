/**
 * WordPress dependencies.
 */
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { MenuGroup, MenuItem } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { Spinner } from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";

/**
 * Internal dependencies.
 */
import "./editor.scss";

export function DuplicateMenuItem({ singleLabel, restBase }) {
	const [postId, setPostId] = useState(0);
	const [duplicationStatus, setDuplicationStatus] = useState(false);
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
		menu_order: currentPostData.menu_order,
		meta: currentPostData.meta,
		template: currentPostData.template,
	};
	useEffect(() => {
		if (0 !== postId) {
			location.href = addQueryArgs("post.php", {
				post: postId,
				action: "edit",
			});
		}
	}, [postId]);

	const fetchData = async () => {
		const response = await apiFetch({
			path: `wp/v2/${restBase}`,
			method: "POST",
			data: DuplicatePost,
		});
		setPostId(response.id);
	};
	function DuplicateThePost() {
		setDuplicationStatus(true);
		fetchData();
	}
	return (
		<MenuGroup>
			<MenuItem
				onClick={DuplicateThePost}
				className="createwithrani-quickpost-duplicate-menu-item"
			>
				{sprintf(
					/* translators: %s: singular label of current post type i.e Page, Post */
					__("Duplicate %s", "createwithrani-quickpost"),
					singleLabel
				)}

				{duplicationStatus && <Spinner />}
			</MenuItem>
		</MenuGroup>
	);
}
