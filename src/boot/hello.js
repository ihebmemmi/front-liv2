import hello from 'hellojs'

export default ({ Vue }) => {
  hello.init({
    facebook: '290872122778104'
  })
  Vue.prototype.$hello = hello
}