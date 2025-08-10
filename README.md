# 🎬 Favorite Movies App

Aplicação web para buscar filmes e gerenciar sua lista de favoritos utilizando a API do **The Movie Database (TMDb)**.

## 📌 1. Descrição
O **Favorite Movies App** permite ao usuário:
- Pesquisar filmes pela API do TMDb.
- Adicionar e remover filmes da lista de favoritos.
- Visualizar a lista de favoritos armazenada localmente no navegador.
- Interface responsiva, com botões fixos e layout adaptável.

---

## 🚀 2. Deploy
A aplicação está disponível online:  
🔗 **[Acessar o App](https://favoritemovies-app-learning.vercel.app/)**

---

## 🛠️ 3. Tecnologias Utilizadas
- **React** (Vite)
- **React Router**
- **Context API** para gerenciamento de estado
- **CSS Modules** para estilização
- **API TMDb** para busca de filmes
- **Vercel** para deploy

---

## 📂 4. Estrutura do Projeto
```
movie-app/
│── public/             # Arquivos estáticos
│── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── context/        # Context API
│   ├── pages/          # Páginas principais
│   ├── App.jsx         # Componente raiz
│   ├── main.jsx        # Ponto de entrada
│── .env                # Variáveis de ambiente
│── package.json        # Dependências e scripts
```

---

## ⚙️ 5. Instalação e Execução Local

### 5.1 Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada) – [Baixar aqui](https://nodejs.org/)  
  O Node.js é a plataforma necessária para executar o JavaScript no lado do servidor e gerenciar pacotes.  

- **NPM** (vem junto com o Node.js) **ou** [**Yarn**](https://yarnpkg.com/) como gerenciador de pacotes.  
  Eles serão usados para instalar as dependências do projeto.

### 5.2 Passos
```bash
# 1. Clonar repositório
git clone https://github.com/LucasBagolin/movie-app.git

# 2. Acessar pasta do projeto
cd movie-app

# 3. Instalar dependências
npm install

# 4. Configurar variáveis de ambiente
# Crie um arquivo .env e adicione:
VITE_TMDB_API_KEY=SUA_CHAVE_API
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMG_BASE=https://image.tmdb.org/t/p

# 5. Rodar localmente
npm run dev
```

---

## 🌍 6. Deploy na Vercel
1. Conectar o repositório GitHub à Vercel.
2. Definir as variáveis de ambiente no painel da Vercel (mesmas do `.env`).
3. Clicar em **Deploy**.

---

## 📖 7. Uso
- Na página inicial, pesquise filmes pelo nome.
- Clique em **Adicionar aos favoritos** para salvá-los.
- Acesse a aba **Favoritos** para gerenciar sua lista.
- Os dados são salvos no **LocalStorage** do navegador.

---

## 🧑‍💻 8. Autor
**Lucas Vieira Bagolin**  
📎 [LinkedIn](https://www.linkedin.com/in/lucasbagolin) 

---

## 📜 9. Licença
Este projeto é distribuído sob a licença MIT.  
Sinta-se livre para usar e modificar.
