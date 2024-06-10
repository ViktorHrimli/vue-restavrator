<script>
import { h } from 'vue'
export default {
	props: {
		tag: {
			type: String,
			default: 'section',
			required: true,
			validator(tag) {
			  const tags = ['h1','h2','h3','h4','h5','h6','div','p','section','article','footer','header','main','a','button'];
			  return tags.includes(tag)
			}
		}
	},
	setup(props, {slots}) {

		const content = ()=> (slots && slots.default) ? slots.default() : slots.default
		return () => h(props.tag, content())
	}
}
</script>
