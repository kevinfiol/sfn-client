run:
	deno run --allow-net --allow-read --allow-write app.js

debug:
	deno run --allow-net --allow-read --allow-write --inspect-brk app.js

lock:
	deno cache --lock=lock.json --lock-write deps.js

# dbsync:
# 	deno run ./models/init.js

reload:
	deno --reload