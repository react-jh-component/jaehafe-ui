import * as React from 'react';
import { Slot, Slottable } from '@/app/src/components/slot/Slot';

interface ButtonProps {
	asChild?: boolean;
	leftElement?: React.ReactNode;
	rightElement?: React.ReactNode;
	children: React.ReactNode;
}

const Button = React.forwardRef<
	React.ElementRef<'button'>,
	React.ComponentProps<'button'> & {
		asChild?: boolean;
		iconLeft?: React.ReactNode;
		iconRight?: React.ReactNode;
	}
>(({ children, asChild = false, iconLeft, iconRight, ...props }, forwardedRef) => {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			{...props}
			ref={forwardedRef}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 5,
				border: '1px solid black',
				padding: 10,
				backgroundColor: 'white',
				fontFamily: 'apple-system, BlinkMacSystemFont, helvetica, arial, sans-serif',
				fontSize: 14,
				borderRadius: 3,
				...props.style,
			}}
		>
			{iconLeft}
			<Slottable>{children}</Slottable>
			{iconRight}
		</Comp>
	);
});

Button.displayName = 'Button';

export default Button;
