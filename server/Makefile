run:
	deno run --allow-net --allow-read --allow-write app.js

debug:
	deno run --allow-net --allow-read --allow-write --inspect-brk app.js

lock:
	deno cache --lock=lock.json --lock-write deps.js

sync_db:
	deno run --allow-read --allow-write ./scripts/sync_db.js

reload:
	deno cache --reload deps.js