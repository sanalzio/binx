bun build --compile --minify --target=bun-linux-x64 ./src/index.js --outfile ./dist/binx-linux-x64
bun build --compile --minify --target=bun-linux-arm64 ./src/index.js --outfile ./dist/binx-linux-arm64
bun build --compile --minify --target=bun-windows-x64 ./src/index.js --outfile ./dist/binx-windows-x64
bun build --compile --minify --target=bun-darwin-x64 ./src/index.js --outfile ./dist/binx-darwin-x64
bun build --compile --minify --target=bun-darwin-arm64 ./src/index.js --outfile ./dist/binx-darwin-arm64