/**
 * WordPress dependencies.
 */
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import { MenuItem, ToolbarItem } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useState } from "@wordpress/element";
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

	const fetchData = async () => {
		const response = await apiFetch({
			path: `wp/v2/${restBase}`,
			method: "POST",
			data: DuplicatePost,
		});
		setPostId(response.id);
		setDuplicationStatus(false);
	};
	function DuplicateThePost() {
		setDuplicationStatus(true);
		fetchData();
	}

	const ViewDuplicatedPost = () => {
		return (
			<ToolbarItem
				as={MenuItem}
				className="createwithrani-quick-post-duplicate-menu-item"
			>
				{sprintf(
					/* translators: %s: singular label of current post type i.e Page, Post */
					__("%s duplicated", "createwithrani-quickpost"),
					singleLabel
				)}
				<a
					href={addQueryArgs("post.php", {
						post: postId,
						action: "edit",
					})}
				>
					{__("View", "createwithrani-quickpost")}
				</a>
			</ToolbarItem>
		);
	};
	const DuplicatePostButton = () => {
		return (
			<ToolbarItem
				onClick={DuplicateThePost}
				as={MenuItem}
				className="createwithrani-quick-post-duplicate-menu-item"
			>
				{sprintf(
					/* translators: %s: singular label of current post type i.e Page, Post */
					__("Duplicate %s", "createwithrani-quickpost"),
					singleLabel
				)}

				{duplicationStatus && <Spinner />}
			</ToolbarItem>
		);
	};
	return (
		<>
			{0 === postId && <DuplicatePostButton />}
			{0 !== postId && <ViewDuplicatedPost />}
		</>
	);
}
