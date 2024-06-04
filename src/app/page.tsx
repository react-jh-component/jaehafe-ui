'use client';

import React, { useRef } from 'react';
import Button from '@/app/src/components/button/Button';
import MockIcon from '@/app/src/components/button/MockIcon';
import { composeRefs } from '@/app/src/components/composeRefs/src';

function Page() {
	const inputRef1 = useRef<HTMLInputElement | null>(null);
	const inputRef2 = useRef<HTMLInputElement | null>(null);

	const combinedRef = composeRefs(inputRef1, inputRef2);

	return (
		<div>
			<Button
				iconLeft={<MockIcon color="tomato" />}
				iconRight={<MockIcon color="royalblue" />}
				ref={console.log}
				asChild
			>
				{/*Button <em>text</em>*/}
				<a href={'/a-link'}>a link</a>
			</Button>

			<input ref={combinedRef} />
		</div>
	);
}

export default Page;
