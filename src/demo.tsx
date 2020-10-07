import React from 'react';
import ReactDOM from 'react-dom';
import { ITM } from './components/ITM'

const element = document.getElementById('app');
ReactDOM.render(<>
  <ITM token="TOKENTOKEN" cid={100000} gid="GTM-XXXX"></ITM>
</>, element)