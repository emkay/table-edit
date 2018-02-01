const Nanocomponent = require('nanocomponent')
const html = require('bel')
const css = require('sheetify')

css('tachyons')

class TableEdit extends Nanocomponent {
  constructor () {
    super()

    this.headers = null
    this.rows = null
  }

  _onCheckClick (i) {
    const state = this.state
    const render = this.render.bind(this)
    return (e) => {
      const newState = Object.assign({}, state)
      newState.rows[i].selected = !newState.rows[i].selected

      return render(newState)
    }
  }

  _renderHeaderCell (data) {
    const value = data.value
    return html`<th class="fw6 tl pa3 bg-white">${value}</th>`
  }

  _renderCell (data, selected) {
    const {value} = data
    const cell = selected ? html`<input value="${value}">` : value
    return html`<td class="pa3">${cell}</td>`
  }

  _renderRow (cells, i) {
    const selected = i === -1 ? false : this.state.rows[i].selected
    return html`
      <tr class="stripe-dark">
        <td class="pa1"><input type="checkbox" checked="${selected}" onclick="${this._onCheckClick(i)}"></td>
        ${cells}
      </tr>`
  }

  createElement (state) {
    this.state = state
    const rows = state.rows
    const headers = state.headers

    const headerCells = headers.map(cell => this._renderHeaderCell(cell))
    const headerRows = this._renderRow(headerCells, -1)

    const renderedRows = rows.map((row, i) => {
      const cells = row.columns.map(cell => {
        const selected = row.selected || false
        return this._renderCell(cell, selected)
      })
      return this._renderRow(cells, i)
    })

    return html`
    <div class="p4 sans-serif">
      <div class="overflow-auto">
        <table class="f6 w-100 mw8 center" cellspacing="0">
          <thead>
            ${headerRows}
          </thead>
          <tbody class="lh-copy">
            ${renderedRows}
          </tbody>
        </table>
        <div class="f6 w-100 mw8 center pa3">
          <a class="fr f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib hot-pink" href="#0">Submit</a>
        </div>
      </div>
    </div>`
  }

  update (state) {
    console.log('updating:', state)
    console.log(Object.is(this.state, state))
    return state !== this.state
  }

  load () {
    console.log('mounted on DOM')
  }

  unload () {
    console.log('removed from DOM')
  }
}

module.exports = TableEdit
