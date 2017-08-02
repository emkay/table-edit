const Microcomponent = require('microcomponent')
const html = require('bel')
const css = require('sheetify')

css('tachyons')

class TableEdit extends Microcomponent {
  constructor ({rows, headers}) {
    super()

    this.headers = headers
    this.rows = rows

    this.on('render', this.render)
    this.on('update', this.update)
    this.on('load', this.load)
    this.on('unload', this.unload)
    return this
  }

  _renderHeaderCell (data) {
    const value = data.value
    return html`<th class="fw6 tl pa3 bg-white">${value}</th>`
  }

  _renderCell (data) {
    const value = data.value
    return html`<td class="pa3">${value}</td>`
  }

  _renderRow (cells) {
    return html`
      <tr class="stripe-dark">
        <td class="pa3"><input type="checkbox"></td>
        ${cells}
      </tr>`
  }

  render () {
    const headerCells = this.headers.map(cell => this._renderHeaderCell(cell))
    const headerRows = this._renderRow(headerCells)

    const rows = this.rows.map(row => {
      const cells = row.columns.map(cell => {
        return this._renderCell(cell)
      })
      return this._renderRow(cells)
    })

    return html`
    <div class="p4 sans-serif">
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            ${headerRows}
          </thead>
          <tbody class="lh-copy">
            ${rows}
          </tbody>
        </table>
        <div class="f6 w-100 mw8 center pa3">
          <a class="fr f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib hot-pink" href="#0">Submit</a>
        </div>
      </div>
    </div>`
  }

  update (props) {
    return props.text !== this.props.text
  }

  load () {
    console.log('mounted on DOM')
  }

  unload () {
    console.log('removed from DOM')
  }
}

module.exports = TableEdit
