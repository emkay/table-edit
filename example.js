const TableEdit = require('.')

const headers = [
  {value: 'Name', type: 'text'},
  {value: 'Address', type: 'text'},
  {value: 'Phone', type: 'text'},
  {value: 'Enabled', type: 'toggle'},
  {value: 'Last Edited By', type: 'read-only'}
]

const rows = [
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
  {columns: [
    {value: 'Sara'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: true},
    {value: 'Someone at 5:50pm'}
  ]},
  {columns: [
    {value: 'Randy Randerson'},
    {value: '5555 Somewhere st.'},
    {value: '888-555-3333'},
    {value: true},
    {value: 'Randy at 3:33pm'}
  ]}
]

const tableEdit = new TableEdit({rows, headers})
document.body.appendChild(tableEdit.render())
