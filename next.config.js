module.exports = {
  basePath: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/YOUR_REPO_NAME/' : '',
  images: {
    unoptimized: true,
  },
}
