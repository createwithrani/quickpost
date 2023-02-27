# QuickPost - Add New Posts & Duplicate from the Block Editor

[![License](https://img.shields.io/badge/license-GPL--2.0%2B-black.svg)](https://github.com/createwithrani/add-new-post/blob/main/license.txt)

![QuickPost](https://github.com/createwithrani/add-new-post/blob/main/assets/banner-1544x500.png?raw=true)

Adds an "Add New" button to the Block Editor (Gutenberg) toolbar, so you can easily create new posts/pages/custom post types without leaving Fullscreen Mode in the editor. A kebab menu on the button allows you to duplicate the current post as well.

## About

Download the latest version of the plugin from [WordPress.org](https://wordpress.org/plugins/quickpost/) or from the [Latest Release area](https://github.com/createwithrani/quickpost/releases/).

A razor sharp plugin that does just one thing: allow you to quickly create new posts from the Block Editor toolbar. You can create new posts in one of two ways:

1. Create a brand new empty post.
2. Duplicate the current post.

This brings back the ability to create new posts, pages, custom post types quickly and easily even when you're in Fullscreen Mode in the Editor.

If you enjoy the plugin, please leave a review! ⭐

If you have a feature request, please create an issue in the [GitHub repository](https://github.com/createwithrani/quickpost). ➕

If you need support, please use the support forum to reach out. 🆘

### Key Features

- A disabled button is available in the toolbar in brand new posts
- The "Add New" button becomes clickable once your post's status is auto-draft, draft, pending, published, or any other state except new.
- You can duplicate the current post with two clicks.
- A keyboard shortcut to create a new post directly from your keyboard (Ctrl + Option + N on Mac or Alt + Shift + N on Windows)

### Requirements

- WordPress 5.8+
- PHP 7.0+

## Filtering QuickPost Visibility

As of v0.1.2, you can filter the visibilty of the entire QuickPost button using the filter `QuickPost.Display`. QuickPost has a property called `visibility`, which you can set to `true` or `false` depending on a condition of your choosing.

### Example: Only allow Administrators to see the button

```js
import { addFilter } from "@wordpress/hooks";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

function onlyAdmins(FilteredComponent) {
	const adminUser = () => {
		const { isAdmin } = useSelect((select) => {
			const { canUser } = select(coreStore);
			// check if current user can create users, because only admins can do that
			const isAdmin = canUser("create", "users"); // returns undefined, true, or false
			return {
				isAdmin: isAdmin,
			};
		});
		return isAdmin;
	};
	return (props) => (
		<>
			<FilteredComponent {...props} visibility={adminUser()} />
		</>
	);
}

addFilter(
	"QuickPost.Display",
	"my-plugin/only-admins-quickpost",
	onlyAdmins
);
```

## Thanks these lovely humans

This was an odd duck, although relatively easy to make. I truly appreciate people taking time out of their day to test and give me feedback so I could make this tiny but handy plugin great. Major props to @sc0ttkclark, @treadlightly, and @christinaworkman for all their help! 💟

## Contributors

@aurooba, @pixolin, @kkoppenhaver
