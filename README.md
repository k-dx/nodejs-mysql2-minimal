# nodejs-mysql2-minimal

A minimal example for nodejs application that connect to db via mysql2 package.

## Deployment

1. Have a mysql server. Create a database with any name (`<db-name>`) and create a table with `db.sql` in it:
   ```
   mysql -u root -p -h <hostname-or-ip> -D <db-name> < db.sql
   ```
2. Create `.env` file from `.env.template`. If the database is on `localhost`, use `127.0.0.1` instead of `localhost` as it causes less problems.
3. Install node dependencies
   ```
   node install
   ```
4. Run it
   ```
   npm start
   ```
5. You can use the `pack.sh` to pack all needed files to send the app somewhere.

## Docker

1. Do the steps in 'Deployment'.
2. Build the image:
   ```
   docker build -t mysql2-minimal .
   ```
3. (Send it to the server)
4. Run the image
   ```
   docker run --env-file ./.env -dp <outside-port>:<inside-port> mysql2-minimal
   ```
   where `<inside-port>` is the one specified in `.env` file.

## Checking if it works

1. In web browser go to `localhost:<inside-port>` for non-docker or `<docker-address>:<outside-port>` for docker to check if the app is correctly running. **This does not connect to the database yet.**
2. Go to `/list` or `/add` to connect to the database and check if it connects successfully.

