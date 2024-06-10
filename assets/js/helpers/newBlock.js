export default function newBlock(slug, content={}, blockProps={}) {
	return {
		blockSlug: `b-${slug}`,
		blockContent: {
			...content,
			...blockProps
		},
	}
}