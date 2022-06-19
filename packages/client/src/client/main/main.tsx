import * as React from 'react'
import { hot } from 'react-hot-loader'
import { RecoilRoot } from 'recoil'
import RecoilNexus, { } from 'recoil-nexus'
import { View } from './view'
import './gutters.css'

const Main = () => {
  return (
    <RecoilRoot>
      <RecoilNexus />
      <View />
    </RecoilRoot>
  )
}

export const App = hot(module)(Main)
