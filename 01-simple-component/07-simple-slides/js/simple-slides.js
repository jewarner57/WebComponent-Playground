
// Creates a simple slideshow

/*

- Challenge - 1 - 

The goal is to make a slide show carousel. Follow the 
comments in the code sample below. 

- Challenge - 2 - 

If everything is working you should be able to control the 
time and transition speed of the slideshow by changing the 
attribues on the tag. 

- Challenge - 3 - 

Add a new attribute and property to create a pause state. 
The goal is to be able to stop and start the slideshow. 

*/

class SimpleSlides extends HTMLElement {
  constructor() {
    super()

    // Use this.getAttribute to get the width, height, time, and transition
    this._width = this.getAttribute('width')
    this._height = this.getAttribute('height')
    this._time = this.getAttribute('time')


    // Create a shadow root node
    this._shadowRoot = this.attachShadow({ mode: 'open' })

    // Create a couple elements to manage slides
    // Create a container div
    // Set the width, height, border, and overflow
    // Append container to shadowroot
    this._container = document.createElement('div')
    this._container.style.width = this._width
    this._container.style.height = this._height
    this._container.style.overflow = 'hidden'

    this._shadowRoot.appendChild(this._container)

    // Create an inner div
    this._inner = document.createElement('div')
    this._inner.style.display = 'flex'
    this._inner.style.transition = `${this._time}ms`

    // Append this to container
    this._container.appendChild(this._inner)

    // Get array of images
    this._imgs = Array.from(this.querySelectorAll('img'))
    // loop over all of the the images in the array and append then to the inner div
    this._imgs.forEach((img) => {
      this._inner.appendChild(img)
    })

    // Keep track of the index of the current image displayed
    this._index = 0

    this._paused = false
  }

  // Use this add the interval/timer
  _addTimer() {
    // use setInterval with the interval set to the time you got from the attribute
    // The callback should call this._nextImg() 
    // Save a reference to your timer so you can remove it
    this._timer = setInterval(() => {
      if (!this._paused) {
        this._nextImg()
      }
    }, this._time);

  }

  // Use this method to remove the interval/timer
  _removeTimer() {
    // use clearInterval() to remove your interval. You need to include the timer reference
    clearInterval(this._timer)
  }

  // This method is called when this component is added to the DOM
  connectedCallback() {
    // Call this._addTimer() here 
    this._addTimer()
  }

  // This method is called when this component is removed from the DOM
  disconnectedCallback() {
    // Call this._removeTimer() here. 
    this._removeTimer()
  }

  // Use this list all properties that your element observes 
  static get observedAttributes() {
    // List the properties you component is observing here: 
    // time, transition...
    return ['width', 'height', 'time', 'transition', 'paused']
  }

  // Use this function handle changes to attributes on the custom element
  attributeChangedCallback(name, oldValue, newValue) {
    // Set properties when attributes change
    switch (name) {
      case 'time':
        // set your time property
        // remove your timer 
        // add a new timer
        this._time = newValue
        this._removeTimer()
        break

      case 'time':
        // Set your transition property
        // Set the transition style on the inner div be sure to 'ms'
        this._time = newValue
        break

      case 'paused':
        // Stretch challenge Set a pause attribute 
        this._paused = JSON.parse(newValue)
        break

      case 'transition':
        this._transition = newValue
        break

    }
  }

  // Use this function to advance to the next image or loop backl to the first image. 
  _nextImg() {
    // Add 1 to index if index is equal to the length of _imgs set it to 0. 
    this._index += 1
    if (this._index >= this._imgs.length) {
      this._index = 0
    }

    // Set translate the inner div to width * index * -1
    // You need to translate the slides one slide width to the left 
    // each time this method is called. 
    this._inner.style.transform = `translate(${(this._width * this._index) * -1}px)`
    this._inner.style.transition = `all ${this._transition}ms`

  }
}

customElements.define('simple-slides', SimpleSlides)
