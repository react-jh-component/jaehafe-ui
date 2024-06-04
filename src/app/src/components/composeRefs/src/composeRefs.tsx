import * as React from 'react';

type PossibleRef<T> = React.Ref<T> | undefined;

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef<T>(ref: PossibleRef<T>, value: T) {
	if (typeof ref === 'function') {
		console.log('ref(value)>>', ref(value));
		ref(value);
	} else if (ref !== null && ref !== undefined) {
		console.log('value>>', value);
		(ref as React.MutableRefObject<T>).current = value;

		console.log('ref.current>>', (ref as React.MutableRefObject<T>).current);
	}
}

/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs<T>(...refs: PossibleRef<T>[]) {
	console.log('refs>>>!!!!', refs);

	return (node: T) => {
		console.log('node>>', node);

		refs.forEach(ref => {
			console.log('ref>>', ref);

			return setRef(ref, node);
		});
	};
}

/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs<T>(...refs: PossibleRef<T>[]) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return React.useCallback(composeRefs(...refs), refs);
}

export { composeRefs, useComposedRefs };
