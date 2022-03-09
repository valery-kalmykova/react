import React, { useEffect, useState, RefObject } from 'react';

export const useOnScreen = (ref: RefObject<HTMLHeadingElement>) => {
	const [isOnScreen, setOnScreen] = useState(false);

	const observer = new IntersectionObserver(
		([entry]) => setOnScreen(entry.isIntersecting),
		{	
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px 0px -80% 0px',
      threshold: .7,
		}
	);

	useEffect(() => {
		observer.observe(ref.current as HTMLElement);
		return () => {
			observer.disconnect();
		};
	});

	return isOnScreen;
};