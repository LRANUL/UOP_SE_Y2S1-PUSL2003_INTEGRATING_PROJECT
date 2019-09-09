# PUSL2003_INTEGRATING_PROJECT
--- 
## Tool Installation
- [Install Chocolatey package manager](https://chocolatey.org/install)
- [Install Postgres database](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
    -  Set password to `postgres` during setup _OR_ open PSQL shell after install and enter `ALTER USER postgres PASSWORD 'postgres';` then restart Postgres service on Windows by typing run in the Windows search bar and typing services.msc and searching for the Postgres service - https://stackoverflow.com/a/37375810
- [Install Elixir programming environment with Chocolatey](https://elixir-lang.org/install.html#windows)
- [Install Phoenix web framework for Elixir](https://hexdocs.pm/phoenix/installation.html)
    - Enter `set HEX_HTTP_CONCURRENCY=1` in command shell before running `mix` - https://github.com/hexpm/hex/issues/308#issuecomment-261723867

## More Info
- [Eduonix Phoenix Tutorial](https://blog.eduonix.com/web-programming-tutorials/introduction-phoenix-framework-works-action/)
