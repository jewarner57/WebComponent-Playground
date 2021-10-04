
class FancyCounter extends HTMLElement {
  constructor() {
    super();

    this._min = -999
    this._max = 999
    this._step = 1
    // Create a shadow node
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Create a container element
    this._container = document.createElement('div')

    // Append the container to the shadow root
    this._shadowRoot.appendChild(this._container)

    // Create three elements left button display and right button
    this._left = document.createElement('div')
    this._right = document.createElement('div')
    this._center = document.createElement('h1')


    this._leftarrow = document.createElement('h1')
    this._leftarrow.innerHTML = '<'
    this._rightarrow = document.createElement('h1')
    this._rightarrow.innerHTML = '>'

    // Add an event to the left button. The left button should add 1 to 
    // the value and update the value displayed
    this._left.addEventListener("click", () => this._decrement())

    // Add an event to the right button that subtracts 1 from the value
    // then update the value displayed. 
    this._right.addEventListener("click", () => this._increment())

    // Append all three elements to the container
    this._container.append(this._left)
    this._container.append(this._center)
    this._container.append(this._right)

    this._left.append(this._leftarrow)
    this._right.append(this._rightarrow)
    // Style the container use display: flex
    this._container.style.display = 'flex'

    // Style the left and right element. These should look like a buttons
    this._left.style.backgroundColor = '#89cff0'
    this._right.style.backgroundColor = '#89cff0'
    this._left.style.width = '50px'
    this._right.style.width = '50px'


    // Style the dipslay element. We need a big number
    this._center.style.fontSize = '70px'
    this._center.style.padding = '10px'

    // Define some properties to track the value displayed in the component
    this._count = 0

    // Display the value in the display element
    this._center.innerHTML = this._count

  }

  // Use this increase the value 
  _increment(e) {
    this._count += this._step

    if (this._count > this._max) {
      this._count = this._max
    }

    this._update()
  }

  // Use this to decrement your value
  _decrement(e) {
    this._count -= this._step

    if (this._count < this._min) {
      this._count = this._min
    }

    this._update()
  }

  // Use this to update the value displayed
  _update() {
    this._center.innerHTML = this._count
  }


  // Tell this component it should look for changes to time
  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }

  attributeChangedCallback(name, oldValue, newValue) {

    if (name === 'min') {
      this._min = Number(newValue)
    }

    if (name === 'max') {
      this._max = Number(newValue)
    }

    if (name === 'step') {
      this._step = Number(newValue)
    }

    if (name === 'value') {
      this._count = Number(newValue)
      this._update()
    }
  }
}

customElements.define('fancy-counter', FancyCounter);


/*

Your goal is to create a counter component. The counter should display a value
and two buttons that increment and decrement the value. It might look like this:

< 0 >

- Challenge - 1 -

Read through the code snippet above. Follow the comments and build the counter component.

- Challenge - 2 -

Use some nested elements to create arrows inside the left and right buttons.

- Challenge - 3 -

The counter would be even better if you could configure the min and max range and the
step value. To do this you'll need to define some attributes.

Add min, max, value, and step to the list of observedAttibutes.

Look for changes in these attributes with the attributeChangedCallback() Inside this method
add an if else of switch statement. You'll need to look at the name to determine the value
of to be set.

if (name === 'vlaue') {
  // set the value to newValue
  // update the displayed value
} else if (name === 'min') {
  // set the min value
  // ...
} else if () {
  // etc.
}

*/
