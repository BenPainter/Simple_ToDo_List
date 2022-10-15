import React from 'react'
import Elements from './Elements'
export default function ElementList(elements) {
  return (
    elements.map(elements => {
        return <Elements elements={elements}/>
    })
  )
}
