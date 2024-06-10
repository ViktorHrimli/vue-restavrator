export function makeBlock (componentSlug, props={}, rootBlock={}) {
	return {
		component: `b-${componentSlug}`,
		props: {
			...props,
			...rootBlock,
		},
	}
}

export function makePage(head, body) {
	return {
		head,
		body,
	}
}
