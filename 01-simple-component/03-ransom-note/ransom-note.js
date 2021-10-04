
// Make a new Component
class RansomNote extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Get the text of the host element this.innerHTML
    this._text = this.innerHTML

    // Split the string into an array of words text.split(' ')
    this._textArray = this._text.split(' ')

    this._phrase = document.createElement('p')

    // Loop over each word in the array
    this._textArray.forEach((elem, index) => {
      const letters = elem.split('')
      const word = document.createElement('span')
      word.style.margin = '5px'

      letters.forEach((elem, index) => {
        // Random Value
        const fs = Math.random() * 30 + 20
        const margin = Math.random() * 5
        const weight = Math.random() * (1000 - -100) + 100

        // Make a span 
        let letter = document.createElement('span')
        letter.style.fontSize = '2em'
        letter.style.margin = '-2px'
        // Set the innerHTML of the span to the current letter 
        letter.innerHTML = elem + ' '
        // Set the color of the span: span.style.color
        letter.style.fontSize = `${fs}px`
        letter.style.margin = `${margin}px`
        letter.style.fontWeight = weight

        // Append the word to the shadowroot
        word.appendChild(letter)
      });
      this._phrase.appendChild(word)

    })

    this._shadowRoot.appendChild(this._phrase)
  }
}

customElements.define('ransom-note', RansomNote);

/*

- Challenge - 1 -

We need a tag that generates text text that looks like a ransom note.
Each character needs a different style. The more random and different
you can make each of the characters the better!

Take a look at the Sample HTML code:

<p>
  <span style="font-size: 22px;">A</span>
  <span style="font-size: 16px;">B</span>
  <span style="font-size: 24px;">C</span>
  <span style="font-size: 33px;">D</span>
  <span style="font-size: 18px;">E</span>
</p>

Your goal is to generate something similar inside the shadowroot.
Follow these steps.

To solve this you'll need to loop over each character of a string.
There are several ways to accomplish this. An easy method would be
to create an array of characters using string.split('')

- Get the text content of the original element.
- For each character in the string make a span.
- Put one character from the source string into each span.
- Set the fontSize of each span to a random font size.

Generate random numbers with:

Math.random() * range

for example:

// generates a random number from 0.0 to 6.0 e.g. 3.458294
Math.random() * 6

If you need an integer use Math.floor() or Math.round()

// generates a random number from 0 to 5 e.g. 4
Math.floor(Math.random() * 6)

If you have values that are not numbers make an array get a random it from the array

const array = ['Helvetica', 'Times', 'Courier']
array[Math.floor(Math.random() * array.length)]

- Challenge - 2 -

Try setting a wider range of properties.

- color
- font-size
- transform: rotate(randomValue)
- font-family
- font-weight

*/

