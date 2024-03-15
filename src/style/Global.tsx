/* eslint-disable */
import { createGlobalStyle } from 'styled-components'
import { InscriptionTheme } from '@inscription/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends InscriptionTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter custom',sans-serif;
  }
  body {
    img {
      height: auto;
      max-width: 100%;
    }
  }
  .btn{
    cursor: pointer;
  }
  .pointer{
    cursor: pointer;
  }
  .flex{
    display: flex;
  }
  .flexb{
    display: flex;
    justify-content: space-between;
  }
  .flexc{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flexstart{
    display: flex;
    justify-content: start;
  }
  .flexend{
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .flexcol{
    flex-direction: column;
  }
  .flexac{
    align-items: center;
  }
  .flexjc{
    justify-content: center;
  }
  .iconfont{
    width: 12px;
    height: 12px;
  }
  .no_data {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 200px;
  }
  :where(.css-14wwjjs).ant-pagination .ant-pagination-item-active:hover,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-item-active:hover{
    border-color: #131313;
  }
  :where(.css-14wwjjs).ant-pagination .ant-pagination-item-active,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-item-active{
    border-color: #131313;
    background-color: #131313;
  }
  :where(.css-14wwjjs).ant-pagination .ant-pagination-item-active:hover,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-item-active:hover{
    border-color: none;
  }
  :where(.css-14wwjjs).ant-pagination .ant-pagination-item-active a,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-item-active a{
    color: #fff;
  }
  :where(.css-14wwjjs).ant-pagination .ant-pagination-item-active:hover a,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-item-active:hover a{
    color: #fff;
  }

  :where(.css-14wwjjs).ant-pagination .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, :where(.css-14wwjjs).ant-pagination .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon,
  :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon, :where(.css-dev-only-do-not-override-14wwjjs).ant-pagination .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon{
    color: #000;
  }
`

export default GlobalStyle
