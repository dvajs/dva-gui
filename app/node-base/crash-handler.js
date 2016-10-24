module.exports = {
  namespace: '',
  services: {
    'crash.report': ({ ctx, dispatch }) => {
      console.log(dispatch('application:info'));
    }
  }
}