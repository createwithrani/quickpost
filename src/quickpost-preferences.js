import { PluginMoreMenuItem } from "@wordpress/edit-post";
import { CheckboxControl, Modal } from "@wordpress/components";
import { useState } from "@wordpress/element";

export const QuickPostPreferences = () => {
	const [isOpen, setOpen] = useState(false);
	const [isChecked, setChecked] = useState(true);
	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	return (
		<>
			<PluginMoreMenuItem onClick={openModal} icon="false">
				QuickPost Preferences
			</PluginMoreMenuItem>
			{isOpen && (
				<Modal
					title="QuickPost Preferences"
					onRequestClose={closeModal}
				>
					<div className="quickpost-preferences">
						<CheckboxControl
							label="Show View Post Button"
							checked={isChecked}
							onChange={setChecked}
						/>
					</div>
				</Modal>
			)}
		</>
	);
};
