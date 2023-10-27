# Pingsville Ping

A tiny Deno server that accepts XML-RPC pings and stores them in a database.

## Set up

### MongoDB

1. [Install MongoDB](https://www.mongodb.com/docs/manual/installation/):

   ```
   brew install mongodb-community@7.0
   ```

1. [Run as a macOS service](https://www.mongodb.com/docs/v7.0/tutorial/install-mongodb-on-os-x/):

   ```
   brew services start mongodb-community@7.0
   ```

### Deno

1. [Install Deno](https://docs.deno.com/runtime/manual/getting_started/installation):

   ```
   brew install deno
   ```

### Pingsville Ping

1. Run server:

   ```
   deno task dev
   ```

## Send test ping

### Postman

Using [Postman](https://www.postman.com/), you can send a POST request to
`localhost:1417` with the following raw XML in the body:

```xml
<?xml version="1.0"?>
<methodCall>
	<methodName>weblogUpdates.extendedPing</methodName>
	<params>
		<param>
			<value>
				<string>Example Blog</string>
			</value>
		</param>
		<param>
			<value>
				<string>https://blog.example.com/</string>
			</value>
		</param>
		<param>
			<value>
				<string>https://blog.example.com/feed/</string>
			</value>
		</param>
	</params>
</methodCall>
```

The Deno task should log the values to the console, and add an entry to the
`blogs` database collection, if the URL is not a duplicate.

If a feed URL is provided, it will grab the feed XML/JSON and add all the
entries to a database collection called `blogPosts`.

### WordPress

You can also try this with real-world data from a local WordPress install (I
recommend [wp-now](https://www.npmjs.com/package/@wp-now/wp-now)) by adding
`localhost:1417` to the list of Update Services in
`wp-admin/options-writing.php`.

## Viewing records

1. Open mongo Shell (`mongosh`)
1. List databases: `show databases`
1. Switch to the Pingsville database: `use pingsville`
1. Show collections: `show collections`
1. Show documents in blogs collection: `db.blogs.find()`
1. To clear all documents from the collection: `db.blogs.deleteMany({})`
1. To count the number of blogs: `db.blogs.countDocuments({})`


## To Do

- [ ] Better error handling
- [ ] Return something meaningful to the pinger
- [ ] Use GraphQL, to be database-agnostic
- [ ] Normalize URLs (remove trailing slash, expand short URLs, etc.)
- [ ] Scrape feed data and store blog posts
- [ ] Prevent spamming?
- [ ] A job queue?
- [ ] Create Pingsville API, for querying data
- [ ] Create Pingsville Web, for browsing content

## Resources

- [XML-RPC Spec](http://xmlrpc.com/spec.md)
- [Rebooting XML-RPC](http://reboot.xmlrpc.com)
- [XML-RPC Debugger](http://scripting.com/code/xmlrpcdebugger/)
- [davexmlrpc](https://www.npmjs.com/package/davexmlrpc)
- [WordPress Update Services](https://wordpress.org/documentation/article/update-services/)
- [What happened to Technorati?](https://tedium.co/2022/11/04/technorati-blog-search-engine-history/)

## How you can help

Please help me! I don't know what I'm doing!!

You can reach me on Mastodon at [@jsit@social.coop](https://social.coop/@jsit)

## License

Boy, I haven't really thought about this.
