import * as React from 'react';

const MockIcon = React.forwardRef<React.ElementRef<'span'>, React.ComponentProps<'span'>>(
	({ color = 'tomato', ...props }, forwardedRef) => (
		<span
			ref={forwardedRef}
			{...props}
			style={{
				display: 'inline-block',
				width: 10,
				height: 10,
				backgroundColor: color,
				...props.style,
			}}
		/>
	),
);

MockIcon.displayName = 'MockIcon';

export default MockIcon;
