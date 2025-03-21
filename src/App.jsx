import { useState } from 'react'

import ReactJson from 'react-json-view'
import testJson from './test.json'
import jq from './jq'

function App() {
  const [exp, setExp] = useState("")
  const [result, setResult] = useState("")

  const onSelect = (selected) => {
    let jq = "."
    for (let i = 0; i < selected.namespace.length; i++) {
      if (!isNaN(selected.namespace[i])) {
        jq += "[]"
      } else {
        jq = (i == 0 ? "" : jq) + "." + selected.namespace[i]
      }
    }
    if (!isNaN(selected.name)) {
      jq += "[]"
    } else {
      jq = (selected.namespace.length == 0 ? "" : jq) + "." + selected.name
    }
    setExp(jq)
  }

  const onClick = () => {
    setResult(jq.prettyPrint(Array.from(jq.compile(exp)(testJson))))
  }

  return (
    <div className='flex flex-row w-full'>
      <ReactJson
        src={testJson}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
        theme="bright:inverted"
        onSelect={onSelect} />
      <div className='flex flex-col w-full'>
        <p>{exp}</p>
        <button onClick={onClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>verify</button>
        <p>{result}</p>
      </div>
    </div>
  )
}

export default App
