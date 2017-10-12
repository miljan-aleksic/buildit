const rollup = require('rollup')
const rollupAnalyzer = require('rollup-analyzer')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const defaults = {
  report: false
}

/*
 * Rollup bundler wrapper
 */
module.exports = async (_config, options) => {
  const plugins = [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs()
  ]

  const config = {..._config}
  const opts = { ...options, ...defaults }

  config.plugins = config.plugins
    ? plugins.concat(config.plugins)
    : plugins

  const bundle = await rollup.rollup(config)

  if (opts.report) {
    const analyze = rollupAnalyzer()

    try {
      // print console optimized analysis string
      await analyze.formatted(bundle).then(console.log)
    } catch (e) {
      console.error(e)
    }
  }

  return bundle.generate(config.output)
}
