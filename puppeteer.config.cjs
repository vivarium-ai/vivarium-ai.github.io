// Minimal puppeteer launch config for CI (GitHub Actions)
module.exports = {
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
};
