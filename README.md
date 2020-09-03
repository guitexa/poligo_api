<p align="center">
    <img alt="POLIGO" src="https://i.imgur.com/QnGTmJV.png" width=60%/>
</p>

<br />

<p align="center">
<img alt="Project working" src="https://media.giphy.com/media/KZpoGrknAvjqznqXWU/giphy.gif" />
</p>

<p align="center">

  <a href="https://github.com/guitexa" target="_blank">
    <img alt="Made by Guilherme Teixeira" src="https://img.shields.io/badge/made%20by-Guilherme_Teixeira-informational">
  </a>
  <a href="https://github.com/guitexa" target="_blank" >
    <img alt="Github - Guilherme Teixeira" src="https://img.shields.io/badge/Github--%23F8952D?style=social&logo=github">
  </a>
  <a href="https://www.linkedin.com/in/guitexa/" target="_blank" >
    <img alt="LinkedIn - Guilherme Teixeira" src="https://img.shields.io/badge/Linkedin--%23F8952D?style=social&logo=linkedin">
  </a>
  <a href="https://wa.me/5534992357050" target="_blank" >
    <img alt="WhatsApp - Guilherme Teixeira" src="https://img.shields.io/badge/WhatsApp--%23F8952D?style=social&logo=whatsapp">
  </a>
  <a href="mailto:guilhermetexa@outlook.com" target="_blank" >
    <img alt="Email - Guilherme Teixeira" src="https://img.shields.io/badge/Email--%23F8952D?style=social&logo=gmail">
  </a>

</p>

## 📜 About the project

This is a private project, the purpose is use it to improve business on WR Medicina e Segurança do Trabalho. However, this project can be commercialized to all occupational safety and health clinicals on Brazil.

## ⚙️ Install and Usage

```sh
# Install all dependencies with Yarn
  yarn
```

> [Install Docker Desktop to create a PostgreSQL container](https://docs.docker.com/)

```sh
# On Docker Terminal, run the following command to create a container
  docker run --name poligo_postgres -e POSTGRES_PASSWORD=poligo -p 5574:5432 -d postgres
```

> [Install DBeaver to create a PostgreSQL database](https://dbeaver.io/)

```sh
# On DBeaver create a new PostgreSQL database with the following data
  host: localhost
  port: 5574
  database: postgres
  username: postgres
  password: poligo
```

```sh
# On /backend run this command to create tables on database
  yarn typeorm migration:run
```

```sh
# On /backend run with Yarn
  yarn dev:server
```

> 🚧 For now, the option to create an account is disabled on frontend, you can create a new account to test using [Insomnia](https://insomnia.rest/).

> On Insomnia, import workspace from ./backend/insomnia.config.json

```sh
# To create a new account, go to Users > Create and send a JSON like this
{
  "name": "Guilherme",
  "email": "mail@mail.com",
  "password": "123456"
}
```

```sh
# On /frontend run with Yarn
  yarn start
```

<br />
Copyright © 2020 Guilherme Teixeira

---

Made with :heart: by [Guilherme Teixeira](https://github.com/guitexa)
