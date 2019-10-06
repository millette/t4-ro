# t4 (read-only)

Static read-only version of t4.

Very easy to support its original content!

```sh
git clone https://github.com/millette/t4-ro.git
cd t4-ro/
npm install
cd pages/
dat dat://981523b0ca60d7269c84864cfda1b542ca3d9fd9be9a250ecf354569b961b781 . # keep open
# in other terminal, cd to t4-ro/ again (not t4-ro/pages/)
npm run build
npm run export
php -t out -S localhost:3000 router.php # keep open
# visit http://localhost:3000/ in your browser
# or http://localhost:3000/custom/all
```

And now visiting as a quadrillion times faster, hourray!

If you must stop `dat`, you can restart it like so:

```sh
cd t4-ro/pages
dat . # and keep it open to receive updates from the source
```

Of course, you'll have to

```sh
npm run build
npm run export
```

to rebuild and reexport whenever the content changes or when you feel like pushing an update.


## Another source?

I created the `981523b0ca60d7269c84864cfda1b542ca3d9fd9be9a250ecf354569b961b781` dat in a `t4` instance like so:

```sh
cd t4/ # your instance
cd docs/
dat . # and note the generated hash to use in t4-ro instead of `98152...`

