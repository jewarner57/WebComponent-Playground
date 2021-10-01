
class rainbowText extends HTMLElement {
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

        // Make a span 
        let letter = document.createElement('span')
        letter.style.fontSize = '2em'
        letter.style.margin = '-2px'
        // Set the innerHTML of the span to the current word 
        letter.innerHTML = elem + ' '
        // Set the color of the span: span.style.color
        const hue = 360 % this._text.length * index
        letter.style.color = `hsl(${hue}, 70%, 50%)`

        // Append the word to the shadowroot
        word.appendChild(letter)
      });
      this._phrase.appendChild(word)

    })

    this._shadowRoot.appendChild(this._phrase)

  }
}

customElements.define('rainbow-text', rainbowText);

/*

- Challenge - 1 -

All of the words in the 'rainbow-text' tag should each be a different
color. To make this happen you'll need to get the text from the source
tag, split into words, make a span for each word and style each of
these spans with a color.

Follow these steps:

- Get the text from the source tag with this.innerHTML
- Split this into an array of words with split(' ')
- Loop over the words
  - Make a new span element with: document.createElement('span')
  - Set the innerHTML to the word from the array: el.innerHTML = arr[i]
  - Set the style to a color: el.style.color = someColor
  - Append the span to the shadowRoot: this._shadowRoot.appendChild(el)

To set the color you can use one of these methods.

Set the color with something like this:

const hue = 360 / words.length * i
const color = `hsl(${hue}, 100%, 50%)`

- Challenge - 2 -

Modify the code to set the color of each letter.



*/