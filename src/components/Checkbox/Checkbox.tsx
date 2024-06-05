import React, { useState } from 'react';

import * as Checkbox from '@/react/checkbox/src';

import { Check as CheckIcon } from 'lucide-react';

import './checkbox.css';

export default function CheckboxDemo() {
	const [checked, setChecked] = React.useState<boolean | 'indeterminate'>(false);

	return (
		<form>
			<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<Checkbox.Root
					className="CheckboxRoot"
					id="c1"
					checked={checked}
					onCheckedChange={setChecked}
				>
					<Checkbox.Indicator className="CheckboxIndicator">
						<CheckIcon />
					</Checkbox.Indicator>
				</Checkbox.Root>
				<label className="Label" htmlFor="c1">
					Accept terms and conditions.
				</label>
			</div>
		</form>
	);
}
