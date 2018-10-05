/*
 * AUX
 * Use it as root element when return jsx
 * This way we can use multiple adjacent elements
 */

// HIGHER ORDER WRAPPER COMPONENT
// allow us to write jsx without wrapping root div element

const aux = (props) => props.children

export default aux