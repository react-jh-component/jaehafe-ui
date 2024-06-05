import * as React from 'react';
import { useCallbackRef } from '../../use-callback-ref/src';

type UseControllableStateParams<T> = {
	prop?: T | undefined;
	defaultProp?: T | undefined;
	onChange?: (state: T) => void;
};

type SetStateFn<T> = (prevState?: T) => T;

function useControllableState<T>({
	prop,
	defaultProp,
	onChange = () => {},
}: UseControllableStateParams<T>) {
	const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({ defaultProp, onChange });
	const isControlled = prop !== undefined;
	const value = isControlled ? prop : uncontrolledProp;
	const handleChange = useCallbackRef(onChange);

	const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = React.useCallback(
		nextValue => {
			if (isControlled) {
				// nextValue = setChecked
				const setter = nextValue as SetStateFn<T>;
				const value = typeof nextValue === 'function' ? setter(prop) : nextValue;
				console.log('setter(prop)>>', setter(prop));
				console.log('setter>>', setter);
				console.log('value>>', value);
				console.log('nextValue === setter>>', nextValue === setter);

				console.log('value>!!!>', value);

				if (value !== prop) handleChange(value as T);
			} else {
				setUncontrolledProp(nextValue);
			}
		},
		[isControlled, prop, setUncontrolledProp, handleChange],
	);

	return [value, setValue] as const;
}

function useUncontrolledState<T>({
	defaultProp,
	onChange,
}: Omit<UseControllableStateParams<T>, 'prop'>) {
	const uncontrolledState = React.useState<T | undefined>(defaultProp);
	const [value] = uncontrolledState;
	const prevValueRef = React.useRef(value);
	const handleChange = useCallbackRef(onChange);

	console.log('prevValueRef>>', prevValueRef);

	React.useEffect(() => {
		if (prevValueRef.current !== value) {
			handleChange(value as T);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef, handleChange]);

	return uncontrolledState;
}

export { useControllableState };
