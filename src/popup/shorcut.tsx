import { useEffect, useState } from 'react';

import Logger from '~services/Logger';
import runTimeHandler from '~services/runTimeHandler';

export function useShortcut() {
	const [shortcut, setShortcut] = useState(undefined);

	const getShortcut = () => {
		runTimeHandler.runtime
			.sendMessage({ message: 'getShortcut' })
			.then((shortcutResponse) => setShortcut(shortcutResponse))
			.catch(Logger.logError);
	};

	useEffect(getShortcut, []);

	return shortcut;
}
export function ShortcutGuide() {
	const shortcutGuide = (
		<a href="https://jiffyreader.com/api/destinations/readme_shortcut" target="_blank">
			How to setup custom shortcut
		</a>
	);
	const shortcut = useShortcut();
	return shortcut ? <></> : shortcutGuide;
}

export default function Shortcut() {
	const shortcut = useShortcut();

	if (!shortcut) {
		return <></>;
	}

	return (
		<span className="text-capitalize">
			{chrome.i18n.getMessage('shortcutLabelText')}:{shortcut}
		</span>
	);
}
