=== QuickPost - Add New Posts & Duplicate from the Block Editor ===
Contributors:      aurooba, pixolin, kkoppenhaver
Tags:              add new, gutenberg, add new post, block editor, duplicate post, duplicate
Requires at least: 5.7
Tested up to:      6.1
Requires PHP:      7.0
Stable tag:        0.1.5
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Donate link:       https://github.com/sponsors/aurooba

Adds an "Add New" button to the Block Editor (Gutenberg) toolbar, so you can easily create new posts/pages/custom post types without leaving Fullscreen Mode in the editor. A kebab menu on the button allows you to duplicate the current post as well.

== Description ==

A razor sharp plugin that does just one thing: allow you to quickly create new posts from the Block Editor toolbar. You can create new posts in one of two ways:

1. Create a brand new empty post.
2. Duplicate the current post.

This brings back the ability to create new posts, pages, custom post types quickly and easily even when you're in Fullscreen Mode in the Editor.

If you enjoy the plugin, please leave a review! ⭐

If you have a feature request, please create an issue in the [GitHub repository](https://github.com/createwithrani/quickpost). ➕

If you need support, please use the support forum to reach out. 🆘

=== Key Features ===


* A disabled button is available in the toolbar in brand new posts
* The "Add New" button becomes clickable once your post's status is auto-draft, draft, pending, published, or any other state except new.
* You can duplicate the current post with two clicks.
* A keyboard shortcut to create a new post directly from your keyboard (Ctrl + Option + N on Mac or Alt + Shift + N on Windows)

=== Stay Connected ===

* [Follow @aurooba on Twitter](https://twitter.com/aurooba)
* [View this plugin on GitHub](https://github.com/createwithrani/quickpost)

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/` directory, install the plugin through the WordPress plugins screen directly, or search for `QuickPost` in the Block Library.
2. Activate the plugin through the 'Plugins' screen in WordPress if installed manually or through the WordPress plugins screen.
3. Use the `Add New` button in the Block Editor toolbar when needed.

== Frequently Asked Questions ==
= Is this plugin supported? =
Yes, this plugin is actively supported. If you have a question, issue, or you've identified a bug, please reach out through the support forums.
= What gets duplicated? =
Right now all _default_ WordPress post information gets duplicated, except featured images. Currently, custom taxonomies, Yoast information, or custom additions are not supported. But as the plugin evolves, more support will be added. Please use the support forums to let us know what you'd like added support for.
= How can I change when QuickPost is available? =
The plugin provides a filter called `QuickPostDisplay` to help you affect QuickPost's visibility. Refer to the example in the [README on GitHub](https://github.com/createwithrani/quickpost/tree/main#filtering-quickpost-visibilitys).

== Screenshots ==

1. In brand new posts, the `Add New` button is disabled.
2. In posts that are not new, the `Add New` button is clickable and lets you create new and duplicate posts right from the Block Editor.
3. Click the kebab menu button to reveal the `Duplicate Post` button.
4. Clicking the `Add New` button takes you to a fresh new post of the same post type.

== Changelog ==

= 0.1.5 - Feb 27, 2023 =

* Adds a new keyboard shortcut to create a new post directly from your keyboard (Ctrl + Option + N on Mac or Alt + Shift + N on Windows)

= 0.1.4 - May 10, 2022 =

* Looks like the last release didn't get pushed correctly, so this is a push to actually fix the `common.min.css` problem.

= 0.1.3 - May 6, 2022 =

* FIX: the `common.min.css` file was getting enqueued unnecessarily to the front-end, this fixes that. Thanks for the report [@mrwweb](https://profiles.wordpress.org/mrwweb/)!

= 0.1.2 - May 1, 2022 =

* NEW FEATURE: You can filter the visibilty of the entire QuickPost button using the filter `QuickPost.Display`. QuickPost has a property called `visibilit`y, which you can set to `true` or `false` depending on a condition of your choosing.
* ENHANCEMENT: The `Add New` button into a true semantic link to allow folks to open the new post in the current tab/window, new tab, or new window.
* ENHANCEMENT: When you choose to duplicate a post, on success, not only does the entire menu item transforms into a semantic link (for the same benefits as the `add new` button transformation, but also with the call to action `Edit duplicated {post type label}`, to correctly indicate they'll be taken to the editor for the newly duplicated post.
* FIX: the translations weren't working correctly because of an incorrectly enqueued file, that's been fixed.

= 0.1.1 - February 27, 2022 =

* Fixes a small bug that causes a fatal error on installs running PHP versions lower than PHP 7.3

= 0.1.0 - February 21, 2022 =

* Release
